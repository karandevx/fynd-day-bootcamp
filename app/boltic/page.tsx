'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { Workflow, Zap, Database, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function BolticPage() {
  const userPayloadExample = `{
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+919876543210",
  "country_code": "91",
  "gender": "male"
}`

  const validationCode = `// Validation Logic for User Creation Payload

// Validation Logic for User Creation Event

function validateUserPayload(payload) {
  console.log("loged payload",payload)
  const errors = [];
  
 
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email)) {
    errors.push("Invalid or missing 'email'");
  }
  
  // Validate first_name
  if (!payload.first_name || payload.first_name.trim().length === 0) {
    errors.push("Missing 'first_name'");
  }
  
  // Validate last_name
  if (!payload.last_name || payload.last_name.trim().length === 0) {
    errors.push("Missing 'last_name'");
  }
  
  // Validate phone_number (optional but if present, must be valid)
  if (payload.phone_number) {
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    if (!phoneRegex.test(payload.phone_number.replace(/\s/g, ''))) {
      errors.push("Invalid 'phone_number' format");
    }
  }
  
  // Validate gender
  if (!payload.gender) {
    errors.push("Missing 'gender'");
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// Example usage
const validation = validateUserPayload(payload);

return validation;
`

  const bolticTableSchema = `// Boltic Table Schema for User Creation Log

Table: users

Columns:
  - id (PRIMARY KEY, AUTO_INCREMENT)
  - email (STRING)
  - first_name (STRING)
  - last_name (STRING)
  - phone_number (STRING)
  - gender (STRING, NULLABLE)
  - status (ENUM: 'pending', 'success', 'error')
  - created_at (TIMESTAMP, DEFAULT NOW())
  - updated_at (TIMESTAMP, DEFAULT NOW(), ON UPDATE NOW())`

  const bolticWorkflowSteps = `Boltic Workflow: User Creation via Postman/API

┌─────────────────────────────────────────┐
│  Step 1: API Endpoint Trigger           │
│  - Receive POST request from Postman    │
│  - Capture incoming JSON payload        │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 2: Log to Boltic Table            │
│  - Generate unique event_id             │
│  - Insert record with status='pending'  │
│  - Store full payload as JSON           │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 3: Validate Payload               │
│  - Check required fields (email, names) │
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
     │        │ - Return 400     │
     │        └──────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Step 5: Create User on Fynd Platform   │
│  - Call Platform API createUser()       │
│  - Send user details                    │
│  - Get created user_id from response    │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 6: Update Boltic Table            │
│  - Set status='success'                 │
│  - Store fynd_user_id                   │
│  - Record updated_at timestamp          │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Step 7: Return Success Response        │
│  - Return 200 with user details         │
│  - Include fynd_user_id and event_id    │
│  - Send notification (optional)         │
└─────────────────────────────────────────┘`

  const nodeJsHandler = `// Complete Node.js Handler for User Creation via API

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Boltic Table Client (pseudo-code)
const BolticTable = require('./boltic-table-client');
const userCreationTable = new BolticTable('user_creation_log');

// Fynd Platform Client
const { PlatformClient, PlatformConfig } = require("@gofynd/fdk-client-javascript");

const config = new PlatformConfig({
  companyId: process.env.COMPANY_ID,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  domain: process.env.DOMAIN // e.g., 'api.fynd.com'
});

const platformClient = new PlatformClient(config);

// Main API handler for user creation
async function createUserHandler(req, res) {
  const payload = req.body;
  const eventId = uuidv4();
  
  console.log(\`[Event \${eventId}] Received user creation request\`);
  
  try {
    // STEP 1: Log to Boltic Table with 'pending' status
    await userCreationTable.insert({
      event_id: eventId,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone_number: payload.phone_number,
      country_code: payload.country_code || null,
      gender: payload.gender || null,
      fynd_user_id: null, // Will be updated after creation
      status: 'pending',
      error_message: null,
      payload: JSON.stringify(payload),
      created_at: new Date()
    });
    
    console.log(\`[Event \${eventId}] Logged to Boltic table with status=pending\`);
    
    // STEP 2: Validate payload
    const validation = validateUserPayload(payload);
    
    if (!validation.valid) {
      // Validation failed
      console.error(\`[Event \${eventId}] Validation failed:\`, validation.errors);
      
      await userCreationTable.update(
        { event_id: eventId },
        {
          status: 'error',
          error_message: validation.errors.join(', '),
          updated_at: new Date()
        }
      );
      
      return res.status(400).json({
        success: false,
        event_id: eventId,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    console.log(\`[Event \${eventId}] Validation passed\`);
    
    // STEP 3: Create user on Fynd Platform
    const applicationId = process.env.APPLICATION_ID; // Your app ID
    const userClient = platformClient.application(applicationId).user;
    
    let createdUser;
    try {
      // Extract phone details
      const phoneNumber = payload.phone_number.replace(/\\+/g, '');
      const countryCode = payload.country_code || phoneNumber.substring(0, 2);
      const phone = phoneNumber.replace(countryCode, '');
      
      // Create user on Fynd Platform
      const createUserBody = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: phone,
        country_code: countryCode,
        email: payload.email,
        gender: payload.gender
      };
      
      console.log(\`[Event \${eventId}] Creating user on Fynd Platform...\`);
      createdUser = await userClient.createUser(createUserBody);
      
      console.log(\`[Event \${eventId}] User created successfully. User ID: \${createdUser.user._id}\`);
      
    } catch (apiError) {
      console.error(\`[Event \${eventId}] Platform API error:\`, apiError);
      
      await userCreationTable.update(
        { event_id: eventId },
        {
          status: 'error',
          error_message: \`Platform API error: \${apiError.message || 'Unknown error'}\`,
          updated_at: new Date()
        }
      );
      
      return res.status(500).json({
        success: false,
        event_id: eventId,
        error: 'Failed to create user on Fynd Platform',
        details: apiError.message
      });
    }
    
    // STEP 4: Update Boltic table with success status
    await userCreationTable.update(
      { event_id: eventId },
      {
        status: 'success',
        fynd_user_id: createdUser.user._id,
        updated_at: new Date()
      }
    );
    
    console.log(\`[Event \${eventId}] Updated Boltic table with status=success\`);
    
    // STEP 5: Return success response
    return res.status(200).json({
      success: true,
      event_id: eventId,
      message: 'User created successfully',
      data: {
        fynd_user_id: createdUser.user._id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: payload.phone_number
      }
    });
    
  } catch (error) {
    console.error(\`[Event \${eventId}] Unexpected error:\`, error);
    
    // Log error to database
    try {
      await userCreationTable.update(
        { event_id: eventId },
        {
          status: 'error',
          error_message: error.message,
          updated_at: new Date()
        }
      );
    } catch (dbError) {
      console.error('Failed to update database:', dbError);
    }
    
    return res.status(500).json({
      success: false,
      event_id: eventId,
      error: 'Internal server error',
      details: error.message
    });
  }
}

// Validation function
function validateUserPayload(payload) {
  const errors = [];
  
  // Validate email (required)
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email)) {
    errors.push("Invalid or missing 'email'");
  }
  
  // Validate first_name (required)
  if (!payload.first_name || payload.first_name.trim().length === 0) {
    errors.push("Missing 'first_name'");
  }
  
  // Validate last_name (required)
  if (!payload.last_name || payload.last_name.trim().length === 0) {
    errors.push("Missing 'last_name'");
  }
  
  // Validate phone_number (required)
  if (!payload.phone_number) {
    errors.push("Missing 'phone_number'");
  } else {
    const phoneRegex = /^\\+?[1-9]\\d{9,14}$/;
    if (!phoneRegex.test(payload.phone_number.replace(/\\s/g, ''))) {
      errors.push("Invalid 'phone_number' format");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// Export handler
module.exports = { createUserHandler };`

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

  const testingExample = `// Testing Your Boltic Workflow with Postman

// 1. Valid Test Payload
const validPayload = {
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+919876543210",
  "country_code": "91",
  "gender": "male"
};

// 2. Send to API endpoint using Postman
// Method: POST
// URL: https://your-boltic-endpoint.com/api/create-user
// Headers: Content-Type: application/json
// Body (raw JSON): Paste the validPayload above

// 3. Expected Success Response (200 OK)
{
  "success": true,
  "message":"User created Successfully!"
}

// 4. Test validation failures with invalid payloads
const invalidPayloads = [
  // Missing required fields
  { 
    "email": "test@example.com" 
  },
  
  // Invalid email format
  { 
    "email": "invalid-email",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+919876543210"
  },
  
  // Invalid phone format
  {
    "email": "test@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "123" // Too short
  },
  
  // Missing phone number
  {
    "email": "test@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
];

// Expected Error Response (400 Bad Request)`

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Hands-On Tutorial
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boltic Workflow: User Creation 
          </h1>
          <p className="text-xl text-gray-600">
            Build an API workflow to create users on Fynd Platform with validation and Boltic table logging
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
              <span><strong>Create REST API endpoints</strong> to receive data from external sources like Postman</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Transform and validate data</strong> before processing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Store workflow logs and state</strong> in Boltic tables (database)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Call Platform APIs</strong> to create/update data on Fynd</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Track status</strong> (pending, success, error) for every operation</span>
            </li>
          </ul>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
            <h4 className="font-semibold text-orange-900 mb-2">🎯 Our Goal</h4>
            <p className="text-orange-800 text-sm">
              Build a workflow that receives user data via Postman/API, validates it, 
              logs it to Boltic table with status tracking, creates the user on Fynd Platform, 
              and returns a success response with the created user ID.
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
              Understand the API Request Payload
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            When you send a POST request via Postman to create a user, you need to send the 
            following JSON payload structure:
          </p>

          <CodeBlock 
            code={userPayloadExample}
            language="json"
            filename="POST Request Payload (Send via Postman)"
          />

          <div className="mt-6 space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Key Fields Explained:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><code>email</code> - User's email address (required, validated)</li>
                <li><code>first_name</code> - User's first name (required)</li>
                <li><code>last_name</code> - User's last name (required)</li>
                <li><code>phone_number</code> - User's phone with country code, e.g., +919876543210 (required)</li>
                <li><code>country_code</code> - Country code without +, e.g., 91 (optional)</li>
                <li><code>gender</code> - User's gender: male, female, or other (optional)</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">📮 How to Test in Postman:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Method: <strong>POST</strong></li>
                <li>• URL: <code>https://your-boltic-endpoint.com/api/create-user</code></li>
                <li>• Headers: <code>Content-Type: application/json</code></li>
                <li>• Body: Select "raw" → "JSON" and paste the payload above</li>
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
            Always validate incoming API request data before processing. This prevents errors and 
            ensures data integrity before creating users on Fynd Platform.
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
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Build the Complete Workflow 
            </h2>
          </div>
{/* 
          <p className="text-gray-700 mb-4">
            Here's a complete Node.js implementation that handles the entire workflow - from receiving 
            the API request to creating a user on Fynd Platform:
          </p>

          <CodeBlock 
            code={nodeJsHandler}
            language="javascript"
            filename="user-creation-handler.js"
          /> */}

          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Key Implementation Details</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Logs to Boltic table immediately with <strong>status='pending'</strong></li>
                <li>• Validates payload before attempting user creation</li>
                <li>• Calls Fynd Platform API <code>createUser()</code> to create the user</li>
                <li>• Updates Boltic table with <strong>status='success'</strong> </li>
                <li>• On error, updates status to <strong>'error'</strong> with error message</li>
                <li>• Returns proper HTTP status codes (200, 400, 500)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Production Best Practices</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Log every step with unique event ID for traceability</li>
                <li>• Update Boltic table status at each step (pending → success/error)</li>
                <li>• Store the complete payload for debugging and auditing</li>
                <li>• Return meaningful error messages to the client</li>
              </ul>
            </div>
          </div>
        </section>

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
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Testing Your Workflow with Postman
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Test your workflow thoroughly using Postman before deploying to production:
          </p>

          <CodeBlock 
            code={testingExample}
            language="javascript"
            filename="testing-with-postman.js"
          />

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">🧪 Testing Checklist</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✓ Test with valid payload (happy path) - should return 200 OK</li>
              <li>✓ Test with invalid email format - should return 400 error</li>
              <li>✓ Test with missing required fields - should return 400 error</li>
              <li>✓ Test with invalid phone number format - should return 400 error</li>
              <li>✓ Check Boltic table: verify status is 'pending' initially</li>
              <li>✓ Check Boltic table: verify status becomes 'success' after user creation</li>
              <li>✓ Check Boltic table: verify fynd_user_id is stored correctly</li>
              <li>✓ Verify error cases update Boltic table with status='error'</li>
            </ul>
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Deploying to Boltic
          </h2>
          <div className="space-y-3 text-green-100">
            <p><strong>Step 1:</strong> Create a new workflow in Boltic dashboard</p>
            <p><strong>Step 2:</strong> Set up an HTTP/REST API trigger endpoint</p>
            <p><strong>Step 3:</strong> Create Boltic table with the schema defined above</p>
            <p><strong>Step 4:</strong> Add your handler code as a custom function node</p>
            <p><strong>Step 5:</strong> Configure environment variables (COMPANY_ID)</p>
            <p><strong>Step 6:</strong> Test with Postman using the generated endpoint URL</p>
            <p><strong>Step 7:</strong> Verify Boltic table logs and status updates</p>
            <p><strong>Step 8:</strong> Enable the workflow and monitor in production</p>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            📝 Workflow Summary
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <p><strong>Trigger:</strong> POST request from Postman with user data (email, name, phone)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm font-bold">2</span>
              </div>
              <p><strong>Log to Boltic:</strong> Insert record with status='pending' and store payload</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 text-sm font-bold">3</span>
              </div>
              <p><strong>Validate:</strong> Check required fields, email format, phone format</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 text-sm font-bold">4</span>
              </div>
              <p><strong>Create User:</strong> Call Fynd Platform API to create user and get fynd_user_id</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-teal-600 text-sm font-bold">5</span>
              </div>
              <p><strong>Update Status:</strong> Set status='success' and store fynd_user_id in Boltic table</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-pink-600 text-sm font-bold">6</span>
              </div>
              <p><strong>Response:</strong> Return success with event_id and fynd_user_id to Postman</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🔑 Key Takeaways</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Boltic can expose REST API endpoints triggered by Postman or any HTTP client</li>
              <li>• Always log requests to Boltic tables with status tracking (pending/success/error)</li>
              <li>• Validate incoming data before making Platform API calls</li>
              <li>• Store both the request payload and created user IDs for auditability</li>
              <li>• Return meaningful responses with event IDs for tracking</li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🎉 Workflow Complete!</h3>
          <p className="text-purple-100 mb-6">
            You now understand how to build production-ready Boltic workflows that receive API requests,
            validate data, create users on Fynd Platform, and log everything to Boltic tables. 
            Ready to put your skills to the test with real assignments?
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

