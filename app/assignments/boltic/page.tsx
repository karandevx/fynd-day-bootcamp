'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle2, AlertTriangle, Workflow, Database } from 'lucide-react'
import { useState } from 'react'

export default function BolticAssignmentPage() {
  const [showSolution, setShowSolution] = useState(false)

  const eventPayloadExample = `[{
  "mode": "replace",
  "company_id": 123456,
  "tags": [],
  "item_id": "TEST-123",
  "store_id": 93812,
  "trace_id": "inv-sync-001",
  "price_marked": 799,
  "total_quantity": 200,
  "expiration_date": "2025-12-31T23:59:59Z",
  "price_effective": 499,
  "seller_identifier": "123"
}]`

  const tableSchema = `-- Boltic Table Schema for Inventory Sync Events

CREATE TABLE inventory_sync_log (
  -- Primary identification
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_id VARCHAR(100) UNIQUE NOT NULL,
  sync_id VARCHAR(100),
  
  -- Event metadata
  event_type VARCHAR(50) DEFAULT 'inventory.sync',
  source VARCHAR(100),
  sync_type VARCHAR(20), -- 'full' or 'partial'
  
  -- Status tracking
  status ENUM('pending', 'processing', 'success', 'error') DEFAULT 'pending',
  error_message TEXT,
  
  -- Inventory details
  total_items INT,
  processed_items INT DEFAULT 0,
  failed_items INT DEFAULT 0,
  
  -- Payload storage
  payload JSON NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL,
  
  -- Indexes for performance
  INDEX idx_status (status),
  INDEX idx_sync_id (sync_id),
  INDEX idx_created_at (created_at),
  INDEX idx_source (source)
);

-- Optional: Detailed item tracking table
CREATE TABLE inventory_sync_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_id VARCHAR(100) NOT NULL,
  item_id VARCHAR(100) NOT NULL,
  sku VARCHAR(100),
  location_id VARCHAR(100),
  quantity INT,
  status ENUM('pending', 'success', 'error') DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (event_id) REFERENCES inventory_sync_log(event_id),
  INDEX idx_event_id (event_id),
  INDEX idx_item_id (item_id)
);`

  const validationRules = `// Validation Rules for Inventory Sync Event

function validateInventorySyncPayload(payload) {
  const errors = [];
  
  // 1. Check event field
  if (!payload.event || payload.event !== 'inventory.sync') {
    errors.push("Invalid or missing 'event' field");
  }
  
  // 2. Check timestamp
  if (!payload.timestamp) {
    errors.push("Missing 'timestamp' field");
  } else {
    const timestamp = new Date(payload.timestamp);
    if (isNaN(timestamp.getTime())) {
      errors.push("Invalid 'timestamp' format");
    }
  }
  
  // 3. Check required IDs
  if (!payload.company_id) {
    errors.push("Missing 'company_id'");
  }
  if (!payload.application_id) {
    errors.push("Missing 'application_id'");
  }
  
  // 4. Check data object
  if (!payload.data) {
    errors.push("Missing 'data' field");
    return { valid: false, errors };
  }
  
  const { data } = payload;
  
  // 5. Check sync_id
  if (!data.sync_id || typeof data.sync_id !== 'string') {
    errors.push("Invalid or missing 'sync_id'");
  }
  
  // 6. Check items array
  if (!Array.isArray(data.items)) {
    errors.push("'items' must be an array");
  } else if (data.items.length === 0) {
    errors.push("'items' array cannot be empty");
  } else {
    // Validate each item
    data.items.forEach((item, index) => {
      // Item ID
      if (!item.item_id) {
        errors.push(\`Item \${index}: missing 'item_id'\`);
      }
      
      // SKU
      if (!item.sku) {
        errors.push(\`Item \${index}: missing 'sku'\`);
      }
      
      // Location ID
      if (!item.location_id) {
        errors.push(\`Item \${index}: missing 'location_id'\`);
      }
      
      // Quantity validation
      if (typeof item.quantity !== 'number') {
        errors.push(\`Item \${index}: 'quantity' must be a number\`);
      } else if (item.quantity < 0) {
        errors.push(\`Item \${index}: 'quantity' cannot be negative\`);
      }
      
      // Price validation
      if (!item.price) {
        errors.push(\`Item \${index}: missing 'price' object\`);
      } else {
        if (typeof item.price.selling !== 'number' || item.price.selling <= 0) {
          errors.push(\`Item \${index}: invalid 'selling' price\`);
        }
        if (typeof item.price.mrp !== 'number' || item.price.mrp <= 0) {
          errors.push(\`Item \${index}: invalid 'mrp' price\`);
        }
        if (item.price.selling > item.price.mrp) {
          errors.push(\`Item \${index}: 'selling' price cannot exceed 'mrp'\`);
        }
        if (!item.price.currency) {
          errors.push(\`Item \${index}: missing 'currency'\`);
        }
      }
    });
  }
  
  // 7. Check source
  if (!data.source) {
    errors.push("Missing 'source' field");
  }
  
  // 8. Check sync_type
  if (!data.sync_type || !['full', 'partial'].includes(data.sync_type)) {
    errors.push("'sync_type' must be either 'full' or 'partial'");
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}`

  const workflowSolution = `// Complete Boltic Workflow Implementation for Inventory Sync

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { PlatformClient, PlatformConfig } = require("@gofynd/fdk-client-javascript");

// Boltic Table Clients
const InventorySyncLog = require('./boltic-tables/inventory-sync-log');
const InventorySyncItems = require('./boltic-tables/inventory-sync-items');

// Fynd Platform Client Setup
const config = new PlatformConfig({
  companyId: process.env.COMPANY_ID,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

const platformClient = new PlatformClient(config);

// Slack Webhook Configuration
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

/**
 * Main webhook handler for inventory sync events
 */
async function handleInventorySyncEvent(req, res) {
  const payload = req.body;
  const eventId = uuidv4();
  
  console.log(\`[Event \${eventId}] Received inventory.sync event\`);
  
  try {
    // STEP 1: Log event to database with 'pending' status
    await InventorySyncLog.insert({
      event_id: eventId,
      sync_id: payload.data?.sync_id,
      event_type: payload.event,
      source: payload.data?.source,
      sync_type: payload.data?.sync_type,
      status: 'pending',
      total_items: payload.data?.items?.length || 0,
      processed_items: 0,
      failed_items: 0,
      payload: JSON.stringify(payload),
      created_at: new Date()
    });
    
    console.log(\`[Event \${eventId}] Logged to database\`);
    
    // STEP 2: Validate payload
    const validation = validateInventorySyncPayload(payload);
    
    if (!validation.valid) {
      // Validation failed - update status to 'error'
      console.error(\`[Event \${eventId}] Validation failed:\`, validation.errors);
      
      await InventorySyncLog.update(
        { event_id: eventId },
        {
          status: 'error',
          error_message: validation.errors.join('; '),
          updated_at: new Date()
        }
      );
      
      // Send error notification to Slack
      await sendSlackNotification({
        type: 'error',
        title: 'Inventory Sync Validation Failed',
        message: \`Event \${eventId}: \${validation.errors.join(', ')}\`,
        eventId: eventId,
        syncId: payload.data?.sync_id
      });
      
      return res.status(400).json({
        success: false,
        event_id: eventId,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    console.log(\`[Event \${eventId}] Validation passed\`);
    
    // STEP 3: Update status to 'processing'
    await InventorySyncLog.update(
      { event_id: eventId },
      {
        status: 'processing',
        updated_at: new Date()
      }
    );
    
    // STEP 4: Process inventory updates
    const { items } = payload.data;
    let processedCount = 0;
    let failedCount = 0;
    const itemResults = [];
    
    for (const item of items) {
      try {
        // Update inventory on Fynd Platform
        await updateInventoryOnPlatform(
          payload.company_id,
          item.item_id,
          item.location_id,
          item.quantity,
          item.price
        );
        
        processedCount++;
        itemResults.push({
          item_id: item.item_id,
          status: 'success'
        });
        
        // Log individual item success
        await InventorySyncItems.insert({
          event_id: eventId,
          item_id: item.item_id,
          sku: item.sku,
          location_id: item.location_id,
          quantity: item.quantity,
          status: 'success',
          created_at: new Date()
        });
        
        console.log(\`[Event \${eventId}] Updated item \${item.item_id}\`);
        
      } catch (itemError) {
        failedCount++;
        itemResults.push({
          item_id: item.item_id,
          status: 'error',
          error: itemError.message
        });
        
        // Log individual item failure
        await InventorySyncItems.insert({
          event_id: eventId,
          item_id: item.item_id,
          sku: item.sku,
          location_id: item.location_id,
          quantity: item.quantity,
          status: 'error',
          error_message: itemError.message,
          created_at: new Date()
        });
        
        console.error(\`[Event \${eventId}] Failed to update item \${item.item_id}:\`, itemError);
      }
    }
    
    // STEP 5: Update final status
    const finalStatus = failedCount === 0 ? 'success' : 
                       processedCount === 0 ? 'error' : 'success';
    
    await InventorySyncLog.update(
      { event_id: eventId },
      {
        status: finalStatus,
        processed_items: processedCount,
        failed_items: failedCount,
        error_message: failedCount > 0 ? \`\${failedCount} items failed to update\` : null,
        processed_at: new Date(),
        updated_at: new Date()
      }
    );
    
    console.log(\`[Event \${eventId}] Processing complete: \${processedCount} success, \${failedCount} failed\`);
    
    // STEP 6: Send Slack notification
    await sendSlackNotification({
      type: finalStatus === 'success' ? 'success' : 'warning',
      title: 'Inventory Sync Completed',
      message: \`Processed \${processedCount}/\${items.length} items successfully\`,
      eventId: eventId,
      syncId: payload.data.sync_id,
      details: {
        total: items.length,
        success: processedCount,
        failed: failedCount,
        source: payload.data.source
      }
    });
    
    // Return success response
    return res.status(200).json({
      success: true,
      event_id: eventId,
      sync_id: payload.data.sync_id,
      results: {
        total: items.length,
        processed: processedCount,
        failed: failedCount
      },
      items: itemResults
    });
    
  } catch (error) {
    console.error(\`[Event \${eventId}] Unexpected error:\`, error);
    
    // Log critical error
    await InventorySyncLog.update(
      { event_id: eventId },
      {
        status: 'error',
        error_message: \`Critical error: \${error.message}\`,
        updated_at: new Date()
      }
    );
    
    // Send critical error alert
    await sendSlackNotification({
      type: 'error',
      title: 'Critical Error in Inventory Sync',
      message: error.message,
      eventId: eventId,
      stack: error.stack
    });
    
    return res.status(500).json({
      success: false,
      event_id: eventId,
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Update inventory on Fynd Platform
 */
async function updateInventoryOnPlatform(companyId, itemId, locationId, quantity, price) {
  const catalog = platformClient.catalog;
  
  try {
    const result = await catalog.updateInventory({
      locationId: locationId,
      itemId: itemId,
      body: {
        quantity: quantity,
        price: {
          effective: price.selling,
          marked: price.mrp,
          currency: price.currency
        }
      }
    });
    
    return result;
    
  } catch (apiError) {
    throw new Error(\`Platform API error: \${apiError.message}\`);
  }
}

/**
 * Send Slack notification
 */
async function sendSlackNotification({ type, title, message, eventId, syncId, details, stack }) {
  if (!SLACK_WEBHOOK_URL) {
    console.warn('Slack webhook URL not configured');
    return;
  }
  
  const colors = {
    success: '#36a64f',
    warning: '#ff9800',
    error: '#f44336'
  };
  
  const emojis = {
    success: ':white_check_mark:',
    warning: ':warning:',
    error: ':x:'
  };
  
  const fields = [
    {
      title: 'Event ID',
      value: eventId,
      short: true
    },
    {
      title: 'Timestamp',
      value: new Date().toISOString(),
      short: true
    }
  ];
  
  if (syncId) {
    fields.push({
      title: 'Sync ID',
      value: syncId,
      short: true
    });
  }
  
  if (details) {
    fields.push({
      title: 'Details',
      value: \`Total: \${details.total} | Success: \${details.success} | Failed: \${details.failed}\`,
      short: false
    });
  }
  
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      attachments: [{
        color: colors[type],
        title: \`\${emojis[type]} \${title}\`,
        text: message,
        fields: fields,
        footer: 'Fynd Inventory Sync',
        ts: Math.floor(Date.now() / 1000)
      }]
    });
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
  }
}

// Export handlers
module.exports = {
  handleInventorySyncEvent,
  validateInventorySyncPayload
};`

  const testingGuide = `// Testing Guide for Inventory Sync Workflow

// 1. Valid Test Payload
const validPayload = {
  "event": "inventory.sync",
  "timestamp": new Date().toISOString(),
  "company_id": "123456",
  "application_id": "app_789",
  "data": {
    "sync_id": "test_sync_" + Date.now(),
    "items": [
      {
        "item_id": "test_item_001",
        "sku": "TEST-SKU-001",
        "location_id": "test_location",
        "quantity": 100,
        "price": {
          "selling": 999,
          "mrp": 1299,
          "currency": "INR"
        }
      }
    ],
    "source": "test_script",
    "sync_type": "partial"
  }
};

// 2. Send test request using curl
curl -X POST https://your-boltic-endpoint.com/webhook/inventory-sync \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(`validPayload`)}'

// 3. Invalid payloads for testing error handling

// Missing required fields
const missingFieldsPayload = {
  "event": "inventory.sync",
  "data": {
    "items": []
  }
};

// Invalid quantity
const invalidQuantityPayload = {
  ...validPayload,
  data: {
    ...validPayload.data,
    items: [{
      ...validPayload.data.items[0],
      quantity: -50 // Negative quantity
    }]
  }
};

// Invalid price
const invalidPricePayload = {
  ...validPayload,
  data: {
    ...validPayload.data,
    items: [{
      ...validPayload.data.items[0],
      price: {
        selling: 2000,
        mrp: 1000, // Selling price > MRP
        currency: "INR"
      }
    }]
  }
};

// 4. Verify database entries
async function verifySync(eventId) {
  const log = await InventorySyncLog.findOne({ event_id: eventId });
  
  console.log("Status:", log.status);
  console.log("Processed Items:", log.processed_items);
  console.log("Failed Items:", log.failed_items);
  console.log("Error Message:", log.error_message);
  
  return log.status === 'success';
}

// 5. Load testing (multiple concurrent requests)
async function loadTest() {
  const promises = [];
  
  for (let i = 0; i < 10; i++) {
    const payload = {
      ...validPayload,
      data: {
        ...validPayload.data,
        sync_id: \`load_test_\${Date.now()}_\${i}\`
      }
    };
    
    promises.push(
      fetch('https://your-endpoint.com/webhook/inventory-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    );
  }
  
  const results = await Promise.all(promises);
  console.log(\`Completed \${results.length} requests\`);
}`

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Assignment 2 of 2
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boltic Assignment: Inventory Sync Workflow
          </h1>
          <p className="text-xl text-gray-600">
            Build an automated workflow to sync inventory from external systems to Fynd Platform
          </p>
        </div>

        {/* Objective */}
        <section className="mb-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Assignment Objective
          </h2>
          <p className="text-orange-100 mb-4">
            Create a production-ready Boltic workflow that:
          </p>
          <ul className="space-y-2 text-orange-100">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Listens to inventory sync events</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Logs events to a Boltic table for tracking and auditing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Validates payload data comprehensively</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Updates inventory on Fynd Platform via API</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Tracks status progression (pending → processing → success/error)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span><strong>Bonus:</strong> Sends Slack notifications for all events</span>
            </li>
          </ul>
        </section>

        {/* Event Payload */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Event Payload Structure
          </h2>
          <p className="text-gray-700 mb-4">
            The inventory sync event will be triggered via Postman with 
            the following payload structure:
          </p>

          <CodeBlock 
            code={eventPayloadExample}
            language="json"
            filename="Inventory Sync Event Payload"
          />

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Payload Fields Explained</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <code>mode</code> - "replace" (default) or "increment" (add/subtract)</li>
              <li>• <code>tags</code> - Array of tags to apply to the item</li>
              <li>• <code>store_id</code> - Fynd Platform store identifier</li>
              <li>• <code>trace_id</code> - Unique identifier for this sync operation</li>
              <li>• <code>price_marked</code> - Marked price of the item</li>
              <li>• <code>total_quantity</code> - Total quantity of the item</li>
              <li>• <code>expiration_date</code> - Expiration date of the item</li>
              <li>• <code>price_effective</code> - Effective price of the item</li>
              <li>• <code>seller_identifier</code> - Seller identifier of the item</li> 
              <li>• <code>item_id</code> - Fynd Platform item identifier</li>
            </ul>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Detailed Requirements
          </h2>

          <div className="space-y-6">
            {/* Requirement 1 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                Event Listener Setup   {/* (10 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Create a webhook endpoint that listens for POST requests</li>
                <li>• Accept JSON payload in request body</li>
                <li>• Return appropriate HTTP status codes (200 success, 400 validation error, 500 server error)</li>
                <li>• Log incoming requests with timestamps</li>
              </ul>
            </div>

            {/* Requirement 2 */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Payload Validation   {/* (5 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Validate all required fields are present</li>
                <li>• Check data types (strings, numbers, arrays)</li>
                <li>• Validate quantity is non-negative</li>
                <li>• Validate price.effective ≤ price.marked</li>
                <li>• Return clear error messages listing all validation failures</li>
              </ul>
            </div>

            {/* Requirement 3 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Error Handling   {/* (5 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Handle validation errors separately from system errors</li>
                <li>• Log detailed error information for debugging</li>
                <li>• Update database status to 'error' when failures occur</li>
                <li>• Send error alerts/notifications</li>
              </ul>
            </div>

            {/* Requirement 4 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Inventory Update via Platform API   {/* (10 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Use Fynd Platform Catalog API to update inventory</li>
                <li>• Update each item in the items array</li>
                <li>• Handle API authentication properly</li>
                <li>• Process items sequentially or in batches</li>
                <li>• Track successful vs failed item updates</li>
                <li>• Handle individual item failures gracefully (don't stop entire sync)</li>
              </ul>
            </div>

            {/* Requirement 5 */}
            <div className="border-l-4 border-red-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Database Logging & Status Tracking   {/* (10 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Log event to Boltic table immediately with status='pending'</li>
                <li>• Update status to 'processing' when validation passes</li>
                <li>• Update status to 'success' when all items processed successfully</li>
                <li>• Update status to 'error' if validation fails or critical error occurs</li>
                <li>• Store full payload as JSON for auditing</li>
              </ul>
            </div>

            {/* Bonus Requirement */}
            <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  ⭐
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Bonus: Slack Integration   {/* (+10 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Send Slack notification on successful completion</li>
                <li>• Send Slack notification on validation failure</li>
                <li>• Send Slack notification on critical errors</li>
              
              </ul>
            </div>
          </div>
        </section>

        {/* Boltic Table Schema */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Boltic Table Schema
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Design your Boltic table with the following schema (or similar):
          </p>

          <CodeBlock 
            code={tableSchema}
            language="sql"
            filename="Boltic Table Schema"
          />
        </section> */}

        {/* Validation Guide */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Validation Implementation Guide
          </h2>
          <p className="text-gray-700 mb-4">
            Implement comprehensive validation to catch errors early:
          </p>

          <CodeBlock 
            code={validationRules}
            language="javascript"
            filename="validation.js"
          />
        </section> */}

        {/* Scoring Rubric */}
        {/* <section className="mb-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Scoring Rubric (Total: 40 + 10 Bonus)
          </h2>
          <div className="space-y-3">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Event Listener Setup</h4>
                <span className="text-2xl font-bold">10</span>
              </div>
              <p className="text-sm text-green-100">
                Webhook endpoint, proper HTTP responses, event ID generation
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Payload Validation</h4>
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-sm text-green-100">
                Comprehensive validation, clear error messages
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Error Handling</h4>
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-sm text-green-100">
                Try-catch blocks, error logging, graceful degradation
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Inventory Update (Platform API)</h4>
                <span className="text-2xl font-bold">10</span>
              </div>
              <p className="text-sm text-green-100">
                Correct API usage, batch processing, individual item tracking
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Database Logging & Status</h4>
                <span className="text-2xl font-bold">10</span>
              </div>
              <p className="text-sm text-green-100">
                Status progression, payload storage, timestamp tracking
              </p>
            </div>

            <div className="bg-yellow-500/20 p-4 rounded-lg border-2 border-yellow-500">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">⭐ Bonus: Slack Integration</h4>
                <span className="text-2xl font-bold">+10</span>
              </div>
              <p className="text-sm text-yellow-100">
                Notifications for all event types, proper formatting, color coding
              </p>
            </div>

            <div className="border-t-2 border-white/30 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Total Score</h3>
                <span className="text-4xl font-bold">40 (+10)</span>
              </div>
            </div>
          </div>
        </section> */}

        {/* Testing Guide */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Testing Your Workflow
          </h2>
          <p className="text-gray-700 mb-4">
            Test your implementation with various scenarios:
          </p>

          <CodeBlock 
            code={testingGuide}
            language="javascript"
            filename="testing-guide.js"
          />

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">🧪 Testing Checklist</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✓ Valid payload with multiple items</li>
              <li>✓ Missing required fields (event, data, items)</li>
              <li>✓ Invalid quantity (negative, non-number)</li>
              <li>✓ Invalid price (selling ≤ mrp)</li>
              <li>✓ Empty items array</li>
              <li>✓ Platform API failure simulation</li>
              <li>✓ Database connection failure</li>
              <li>✓ Verify Slack notifications</li>
              <li>✓ Check database status updates</li>
            </ul>
          </div>
        </section> */}

        {/* Example Solution */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Example Solution
            </h2>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>

          {showSolution && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Important:</strong> Attempt the assignment on your own first. 
                  This solution is a reference implementation to help you if you're stuck.
                </p>
              </div>

              <CodeBlock 
                code={workflowSolution}
                language="javascript"
                filename="inventory-sync-handler.js"
              />
            </div>
          )}
        </section> */}

        {/* Submission */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🎉 Ready to Submit?</h3>
          <p className="text-gray-300 mb-6">
            Ensure your code is well-documented, all requirements are met, and you've tested 
            thoroughly. Push to GitHub and share the repository link.
          </p>
          <div className="flex gap-4">
            <a 
              href="/assignments"
              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Back to Assignments
            </a>
            <a 
              href="/"
              className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

