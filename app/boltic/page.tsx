'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { Workflow, Zap, Database, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function BolticPage() {
  const userPayloadExample = `{
  "event": "user.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "company_id": "123456",
  "application_id": "app_789",
  "data": {
    "user_id": "usr_abc123",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+919876543210",
    "created_at": "2024-01-15T10:30:00Z",
    "metadata": {
      "source": "web",
      "signup_method": "email"
    }
  }
}`

  const validationCode = `// Validation Logic for User Creation Event

function validateUserPayload(payload) {
  const errors = [];
  
  // Check required fields
  if (!payload.event) {
    errors.push("Missing 'event' field");
  }
  
  if (!payload.data) {
    errors.push("Missing 'data' field");
    return { valid: false, errors };
  }
  
  const { data } = payload;
  
  // Validate user_id
  if (!data.user_id || typeof data.user_id !== 'string') {
    errors.push("Invalid or missing 'user_id'");
  }
  
  // Validate email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid or missing 'email'");
  }
  
  // Validate first_name
  if (!data.first_name || data.first_name.trim().length === 0) {
    errors.push("Missing 'first_name'");
  }
  
  // Validate last_name
  if (!data.last_name || data.last_name.trim().length === 0) {
    errors.push("Missing 'last_name'");
  }
  
  // Validate phone_number (optional but if present, must be valid)
  if (data.phone_number) {
    const phoneRegex = /^\\+?[1-9]\\d{9,14}$/;
    if (!phoneRegex.test(data.phone_number.replace(/\\s/g, ''))) {
      errors.push("Invalid 'phone_number' format");
    }
  }
  
  // Validate timestamp
  if (data.created_at) {
    const timestamp = new Date(data.created_at);
    if (isNaN(timestamp.getTime())) {
      errors.push("Invalid 'created_at' timestamp");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// Example usage
const validation = validateUserPayload(incomingPayload);

if (!validation.valid) {
  console.error("Validation failed:", validation.errors);
  // Handle validation failure
} else {
  console.log("Payload is valid, proceeding...");
  // Continue with workflow
}`

  const bolticTableSchema = `// Boltic Table Schema for User Events Log

Table: user_events_log

Columns:
  - id (PRIMARY KEY, AUTO_INCREMENT)
  - event_id (STRING, UNIQUE) - Unique identifier for the event
  - event_type (STRING) - Type of event (e.g., "user.created")
  - user_id (STRING) - Fynd user ID
  - email (STRING)
  - first_name (STRING)
  - last_name (STRING)
  - phone_number (STRING, NULLABLE)
  - status (ENUM: 'pending', 'processing', 'success', 'error')
  - error_message (TEXT, NULLABLE)
  - payload (JSON) - Full event payload
  - created_at (TIMESTAMP, DEFAULT NOW())
  - updated_at (TIMESTAMP, DEFAULT NOW(), ON UPDATE NOW())
  - processed_at (TIMESTAMP, NULLABLE)

Indexes:
  - INDEX on user_id
  - INDEX on email
  - INDEX on status
  - INDEX on created_at`

  const bolticWorkflowSteps = `Boltic Workflow: User Creation Handler

┌─────────────────────────────────────────┐
│  Step 1: Event Listener                │
│  - Listen to "user.created" webhook     │
│  - Capture incoming payload             │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 2: Log to Boltic Table            │
│  - Insert record with status='pending'  │
│  - Store full payload                   │
│  - Generate event_id                    │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 3: Validate Payload               │
│  - Check required fields                │
│  - Validate email format                │
│  - Validate phone format                │
│  - Check data types                     │
└───────────┬─────────────────────────────┘
            │
            ▼
      ┌─────┴─────┐
      │ Valid?    │
      └─────┬─────┘
            │
     ┌──────┴──────┐
     │             │
    YES           NO
     │             │
     ▼             ▼
┌─────────┐   ┌──────────────────┐
│ Step 4a │   │ Step 4b          │
│ Success │   │ Handle Error     │
│ Path    │   │ - Update status  │
└────┬────┘   │   to 'error'     │
     │        │ - Log error msg  │
     │        │ - Send alert     │
     │        └──────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Step 5: Update Fynd Platform           │
│  - Call Platform API                    │
│  - Enrich user data (if needed)         │
│  - Add custom attributes                │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 6: Update Boltic Table            │
│  - Set status='success'                 │
│  - Record processed_at timestamp        │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 7: Notification (Optional)        │
│  - Send Slack notification              │
│  - Send welcome email                   │
│  - Update analytics                     │
└─────────────────────────────────────────┘`

  const nodeJsHandler = `// Complete Node.js Handler for User Creation Workflow

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Boltic Table Client (pseudo-code)
const BolticTable = require('./boltic-table-client');
const userEventsTable = new BolticTable('user_events_log');

// Fynd Platform Client
const { PlatformClient, PlatformConfig } = require("@gofynd/fdk-client-javascript");

const config = new PlatformConfig({
  companyId: process.env.COMPANY_ID,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

const platformClient = new PlatformClient(config);

// Main webhook handler
async function handleUserCreatedEvent(req, res) {
  const payload = req.body;
  const eventId = uuidv4();
  
  console.log(\`[Event \${eventId}] Received user.created event\`);
  
  try {
    // STEP 1: Log to Boltic Table with 'pending' status
    await userEventsTable.insert({
      event_id: eventId,
      event_type: payload.event,
      user_id: payload.data.user_id,
      email: payload.data.email,
      first_name: payload.data.first_name,
      last_name: payload.data.last_name,
      phone_number: payload.data.phone_number || null,
      status: 'pending',
      payload: JSON.stringify(payload),
      created_at: new Date()
    });
    
    console.log(\`[Event \${eventId}] Logged to database\`);
    
    // STEP 2: Validate payload
    const validation = validateUserPayload(payload);
    
    if (!validation.valid) {
      // Validation failed
      console.error(\`[Event \${eventId}] Validation failed:\`, validation.errors);
      
      await userEventsTable.update(
        { event_id: eventId },
        {
          status: 'error',
          error_message: validation.errors.join(', '),
          updated_at: new Date()
        }
      );
      
      // Send error notification
      await sendSlackAlert({
        type: 'error',
        message: \`User creation validation failed: \${validation.errors.join(', ')}\`,
        user_id: payload.data.user_id,
        event_id: eventId
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    console.log(\`[Event \${eventId}] Validation passed\`);
    
    // STEP 3: Update status to 'processing'
    await userEventsTable.update(
      { event_id: eventId },
      {
        status: 'processing',
        updated_at: new Date()
      }
    );
    
    // STEP 4: Update user on Fynd Platform (enrich data)
    const userData = payload.data;
    const userClient = platformClient.application(payload.application_id).user;
    
    try {
      // Add custom attributes or tags
      await userClient.updateUser({
        userId: userData.user_id,
        body: {
          metadata: {
            ...userData.metadata,
            onboarding_completed: false,
            signup_date: userData.created_at,
            source: userData.metadata?.source || 'unknown'
          }
        }
      });
      
      console.log(\`[Event \${eventId}] Updated Fynd Platform user\`);
      
    } catch (apiError) {
      console.error(\`[Event \${eventId}] Platform API error:\`, apiError);
      
      await userEventsTable.update(
        { event_id: eventId },
        {
          status: 'error',
          error_message: \`Platform API error: \${apiError.message}\`,
          updated_at: new Date()
        }
      );
      
      throw apiError;
    }
    
    // STEP 5: Mark as success
    await userEventsTable.update(
      { event_id: eventId },
      {
        status: 'success',
        processed_at: new Date(),
        updated_at: new Date()
      }
    );
    
    console.log(\`[Event \${eventId}] Processing complete\`);
    
    // STEP 6: Send success notification
    await sendSlackAlert({
      type: 'success',
      message: \`New user created: \${userData.first_name} \${userData.last_name}\`,
      email: userData.email,
      user_id: userData.user_id,
      event_id: eventId
    });
    
    // Return success response
    return res.status(200).json({
      success: true,
      event_id: eventId,
      message: 'User creation processed successfully'
    });
    
  } catch (error) {
    console.error(\`[Event \${eventId}] Unexpected error:\`, error);
    
    // Log error to database
    await userEventsTable.update(
      { event_id: eventId },
      {
        status: 'error',
        error_message: error.message,
        updated_at: new Date()
      }
    );
    
    // Send error alert
    await sendSlackAlert({
      type: 'error',
      message: \`Critical error in user creation workflow: \${error.message}\`,
      event_id: eventId
    });
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      event_id: eventId
    });
  }
}

// Validation function (from previous example)
function validateUserPayload(payload) {
  // ... (same as before)
}

// Slack notification helper
async function sendSlackAlert(alert) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('Slack webhook URL not configured');
    return;
  }
  
  const color = alert.type === 'success' ? '#36a64f' : '#ff0000';
  const emoji = alert.type === 'success' ? ':white_check_mark:' : ':x:';
  
  try {
    await axios.post(webhookUrl, {
      attachments: [{
        color: color,
        title: \`\${emoji} User Creation Event\`,
        text: alert.message,
        fields: [
          {
            title: 'Event ID',
            value: alert.event_id,
            short: true
          },
          {
            title: 'User ID',
            value: alert.user_id || 'N/A',
            short: true
          },
          {
            title: 'Email',
            value: alert.email || 'N/A',
            short: true
          },
          {
            title: 'Timestamp',
            value: new Date().toISOString(),
            short: true
          }
        ]
      }]
    });
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
  }
}

// Export handler
module.exports = { handleUserCreatedEvent };`

  const errorHandlingExample = `// Advanced Error Handling in Boltic Workflows

// 1. Retry Logic with Exponential Backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(\`Failed after \${maxRetries} attempts: \${error.message}\`);
      }
      
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
await retryWithBackoff(async () => {
  return await platformClient.user.updateUser({ userId, body });
});

// 2. Dead Letter Queue for Failed Events
async function moveToDeadLetterQueue(eventId, error) {
  await deadLetterTable.insert({
    original_event_id: eventId,
    error_message: error.message,
    error_stack: error.stack,
    retry_count: 0,
    max_retries: 5,
    next_retry_at: new Date(Date.now() + 60000), // 1 minute
    created_at: new Date()
  });
}

// 3. Circuit Breaker Pattern
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

const breaker = new CircuitBreaker(5, 60000);

// Usage
await breaker.execute(async () => {
  return await platformClient.catalog.getProducts({});
});`

  const testingExample = `// Testing Your Boltic Workflow

// 1. Create test payload
const testPayload = {
  event: "user.created",
  timestamp: new Date().toISOString(),
  company_id: "123456",
  application_id: "app_789",
  data: {
    user_id: "test_usr_" + Date.now(),
    email: "test@example.com",
    first_name: "Test",
    last_name: "User",
    phone_number: "+919876543210",
    created_at: new Date().toISOString(),
    metadata: {
      source: "test",
      signup_method: "email"
    }
  }
};

// 2. Send to webhook endpoint (using curl or Postman)
// curl -X POST https://your-boltic-endpoint.com/webhook/user-created \\
//   -H "Content-Type: application/json" \\
//   -d '${JSON.stringify(`testPayload`)}'

// 3. Check Boltic table for record
async function verifyEventProcessed(eventId) {
  const record = await userEventsTable.findOne({ event_id: eventId });
  
  console.log("Event Status:", record.status);
  console.log("Processed At:", record.processed_at);
  console.log("Error:", record.error_message);
  
  return record.status === 'success';
}

// 4. Test validation failures
const invalidPayloads = [
  { event: "user.created", data: {} }, // Missing required fields
  { event: "user.created", data: { user_id: "123", email: "invalid" } }, // Invalid email
  { event: "user.created", data: { user_id: "123", email: "test@test.com" } }, // Missing name
];

for (const payload of invalidPayloads) {
  try {
    await handleUserCreatedEvent({ body: payload }, mockResponse);
    console.log("Should have failed but didn't!");
  } catch (error) {
    console.log("Correctly rejected invalid payload");
  }
}`

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Hands-On Tutorial
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boltic Workflow: User Creation Event
          </h1>
          <p className="text-xl text-gray-600">
            Build an automated workflow to handle user creation events with validation and logging
          </p>
        </div>

        {/* What is Boltic */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What is Boltic?
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>Boltic</strong> is Fynd's workflow automation platform that allows you to build 
            complex business logic without writing extensive backend code. It's a visual workflow 
            builder combined with powerful data transformation and integration capabilities.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            With Boltic, you can:
          </p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Listen to platform events</strong> (webhooks) and react automatically</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Transform and validate data</strong> before processing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Integrate with third-party services</strong> (Slack, email, CRM, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Store workflow state</strong> in Boltic tables (database)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Call Platform APIs</strong> to update data on Fynd</span>
            </li>
          </ul>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
            <h4 className="font-semibold text-orange-900 mb-2">🎯 Our Goal</h4>
            <p className="text-orange-800 text-sm">
              Build a workflow that listens for user creation events, validates the data, 
              logs it to a database, updates the user on Fynd Platform, and sends notifications.
            </p>
          </div>
        </section>

        {/* Workflow Overview */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Workflow className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold">
              Workflow Architecture
            </h2>
          </div>
          
          <pre className="bg-black/20 p-6 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
{bolticWorkflowSteps}
          </pre>
        </section>

        {/* Step 1: Event Payload */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Understand the Event Payload
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            When a user is created on Fynd Platform, a webhook event is triggered with the 
            following payload structure:
          </p>

          <CodeBlock 
            code={userPayloadExample}
            language="json"
            filename="User Created Event Payload"
          />

          <div className="mt-6 space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Key Fields Explained:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><code>event</code> - Event type identifier</li>
                <li><code>timestamp</code> - When the event occurred</li>
                <li><code>company_id</code> / <code>application_id</code> - Context identifiers</li>
                <li><code>data.user_id</code> - Unique Fynd user ID</li>
                <li><code>data.email</code> / <code>phone_number</code> - Contact information</li>
                <li><code>data.metadata</code> - Additional context about signup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 2: Validation */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Validate the Payload
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Always validate incoming webhook data before processing. This prevents errors and 
            ensures data integrity.
          </p>

          <CodeBlock 
            code={validationCode}
            language="javascript"
            filename="validation.js"
          />

          <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ Validation Checklist</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Check all required fields are present</li>
              <li>✓ Validate data types (string, number, etc.)</li>
              <li>✓ Validate formats (email, phone, timestamp)</li>
              <li>✓ Check for reasonable values (no negative quantities, etc.)</li>
              <li>✓ Return clear error messages for debugging</li>
            </ul>
          </div>
        </section>

        {/* Step 3: Boltic Table */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Design Boltic Table Schema
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Boltic Tables are like database tables where you can store workflow state and logs. 
            Design a schema to track user creation events:
          </p>

          <CodeBlock 
            code={bolticTableSchema}
            language="sql"
            filename="Boltic Table Schema"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">📊 Why Track Status?</h4>
              <p className="text-sm text-purple-800">
                Status tracking allows you to monitor workflow progress, identify failures, 
                and retry failed events. It's essential for production systems.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🔍 Why Store Payload?</h4>
              <p className="text-sm text-blue-800">
                Storing the full payload helps with debugging, auditing, and replay scenarios. 
                You can always see exactly what data was received.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: Complete Handler */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Build the Complete Workflow 
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Here's a complete Node.js implementation that handles the entire workflow:
          </p>

          <CodeBlock 
            code={nodeJsHandler}
            language="javascript"
            filename="user-creation-handler.js"
          />

          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Key Implementation Details</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Uses <code>uuidv4()</code> to generate unique event IDs</li>
                <li>• Logs to database immediately with 'pending' status</li>
                <li>• Updates status at each step (pending → processing → success/error)</li>
                <li>• Sends Slack notifications for both success and failure</li>
                <li>• Includes detailed error logging for debugging</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Production Best Practices</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Always use try-catch for error handling</li>
                <li>• Log every step with unique event ID for traceability</li>
                <li>• Update database status progressively</li>
                <li>• Send alerts for both errors and critical events</li>
                <li>• Return proper HTTP status codes</li>
              </ul>
            </div>
          </div>
        </section> */}

        {/* Error Handling */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Advanced Error Handling
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Production workflows need robust error handling strategies:
          </p>

          <CodeBlock 
            code={errorHandlingExample}
            language="javascript"
            filename="error-handling.js"
          />
        </section> */}

        {/* Testing */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Testing Your Workflow
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Test your workflow thoroughly before deploying to production:
          </p>

          <CodeBlock 
            code={testingExample}
            language="javascript"
            filename="testing.js"
          />

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">🧪 Testing Checklist</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✓ Test with valid payload (happy path)</li>
              <li>✓ Test with invalid payloads (validation errors)</li>
              <li>✓ Test with missing required fields</li>
              <li>✓ Test Platform API failure scenarios</li>
              <li>✓ Test database connection failures</li>
              <li>✓ Verify Slack notifications are sent</li>
              <li>✓ Check Boltic table records are created correctly</li>
            </ul>
          </div>
        </section> */}

        {/* Deployment */}
        <section className="mb-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Deploying to Boltic
          </h2>
          <div className="space-y-3 text-green-100">
            <p><strong>Step 1:</strong> Create a new workflow in Boltic dashboard</p>
            <p><strong>Step 2:</strong> Set up webhook trigger for "user.created" event</p>
            <p><strong>Step 3:</strong> Add your handler code as a custom function node</p>
            <p><strong>Step 4:</strong> Configure environment variables (API keys, secrets)</p>
            <p><strong>Step 5:</strong> Test with sample payload</p>
            <p><strong>Step 6:</strong> Enable the workflow and monitor logs</p>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🎉 Workflow Complete!</h3>
          <p className="text-purple-100 mb-6">
            You now understand how to build production-ready Boltic workflows. Ready to put 
            your skills to the test with real assignments?
          </p>
          <div className="flex gap-4">
            <a 
              href="/assignments"
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              View All Assignments →
            </a>
            <a 
              href="/assignments/boltic"
              className="inline-block bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition"
            >
              Try Boltic Assignment →
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

