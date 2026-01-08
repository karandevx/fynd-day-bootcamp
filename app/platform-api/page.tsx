'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { Key, Code2, Database, Shield, Zap } from 'lucide-react'

export default function PlatformAPIPage() {
  const authExample = `// Method 1: Using OAuth 2.0 (Recommended for applications)
const { PlatformClient, PlatformConfig } = require("@gofynd/fdk-client-javascript");

const config = new PlatformConfig({
  companyId: "YOUR_COMPANY_ID",
  apiKey: "YOUR_API_KEY",
  apiSecret: "YOUR_API_SECRET",
  domain: "https://api.fynd.com"
});

const platformClient = new PlatformClient(config);

// Generate access token
await platformClient.auth.getAccessToken();

// Now you can make API calls
const catalogClient = platformClient.application("APPLICATION_ID").catalog;
`

  const sdkExample = `// Installing the SDK
// npm install @gofynd/fdk-client-javascript

const { PlatformClient, PlatformConfig } = require("@gofynd/fdk-client-javascript");

// Initialize Platform Client
const config = new PlatformConfig({
  companyId: "123456",
  apiKey: "your-api-key",
  apiSecret: "your-api-secret",
  domain: "https://api.fynd.com"
});

const platformClient = new PlatformClient(config);

// Example: Get Products
async function getProducts() {
  try {
    const catalog = platformClient.application("app-id").catalog;
    
    const products = await catalog.getProducts({
      pageSize: 20,
      pageNo: 1,
      q: "shoes", // Search query
      sortOn: "popular"
    });
    
    console.log(\`Found \${products.items.length} products\`);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Example: Get Product by Slug
async function getProductDetails(slug) {
  try {
    const catalog = platformClient.application("app-id").catalog;
    
    const product = await catalog.getProductDetailBySlug({ slug });
    
    console.log("Product:", product.name);
    console.log("Price:", product.price);
    console.log("Sizes:", product.sizes);
    
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}`

  const restApiExample = `// Using REST API directly (without SDK)
const axios = require('axios');

const BASE_URL = 'https://api.fynd.com';
const API_KEY = 'your-api-key';
const API_SECRET = 'your-api-secret';
const COMPANY_ID = 'your-company-id';
const APPLICATION_ID = 'your-application-id';

// Helper function to get access token
async function getAccessToken() {
  const response = await axios.post(
    \`\${BASE_URL}/service/panel/authentication/v1.0/company/\${COMPANY_ID}/oauth/token\`,
    {
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET
    }
  );
  
  return response.data.access_token;
}

// Get Products
async function fetchProducts(query, page = 1, pageSize = 20) {
  const token = await getAccessToken();
  
  const response = await axios.get(
    \`\${BASE_URL}/service/application/catalog/v1.0/products\`,
    {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'x-company-id': COMPANY_ID,
        'x-application-id': APPLICATION_ID
      },
      params: {
        q: query,
        page_no: page,
        page_size: pageSize
      }
    }
  );
  
  return response.data;
}

// Get User by ID
async function getUserById(userId) {
  const token = await getAccessToken();
  
  const response = await axios.get(
    \`\${BASE_URL}/service/application/user/authentication/v1.0/users/\${userId}\`,
    {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'x-company-id': COMPANY_ID,
        'x-application-id': APPLICATION_ID
      }
    }
  );
  
  return response.data;
}

// Update Inventory
async function updateInventory(itemId, locationId, quantity) {
  const token = await getAccessToken();
  
  const response = await axios.put(
    \`\${BASE_URL}/service/platform/catalog/v1.0/company/\${COMPANY_ID}/inventory/\${itemId}/location/\${locationId}\`,
    {
      quantity: quantity,
      price: {
        effective: 1999,
        marked: 2499
      }
    },
    {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'x-company-id': COMPANY_ID
      }
    }
  );
  
  return response.data;
}`

  const catalogApiExample = `// Common Catalog API Operations

// 1. Get All Products with Filters
async function getFilteredProducts() {
  const catalog = platformClient.application("app-id").catalog;
  
  const products = await catalog.getProducts({
    pageSize: 50,
    pageNo: 1,
    q: "shirts",
    brand: ["nike", "adidas"],
    category: ["men-clothing"],
    priceMin: 500,
    priceMax: 2000,
    sortOn: "discount_high_to_low"
  });
  
  return products;
}

// 2. Get Product Details by Slug
async function getProductBySlug(slug) {
  const catalog = platformClient.application("app-id").catalog;
  return await catalog.getProductDetailBySlug({ slug });
}

// 3. Get Collections
async function getCollections() {
  const catalog = platformClient.application("app-id").catalog;
  
  const collections = await catalog.getCollections({
    pageSize: 10,
    pageNo: 1
  });
  
  return collections;
}

// 4. Get Products in Collection
async function getCollectionProducts(collectionSlug) {
  const catalog = platformClient.application("app-id").catalog;
  
  const products = await catalog.getProductsByCollection({
    slug: collectionSlug,
    pageSize: 20
  });
  
  return products;
}

// 5. Get Product Variants
async function getProductVariants(itemCode) {
  const catalog = platformClient.application("app-id").catalog;
  
  const variants = await catalog.getProductVariants({
    itemCode: itemCode
  });
  
  return variants;
}`

  const userApiExample = `// User Management API Operations

// 1. Get User Profile
async function getUserProfile(userId) {
  const user = platformClient.application("app-id").user;
  
  const profile = await user.getUserById({ userId });
  
  console.log("Name:", profile.first_name, profile.last_name);
  console.log("Email:", profile.email);
  console.log("Phone:", profile.phone_number);
  
  return profile;
}

// 2. Update User Profile
async function updateUserProfile(userId, updates) {
  const user = platformClient.application("app-id").user;
  
  const updated = await user.updateUser({
    userId: userId,
    body: {
      first_name: updates.firstName,
      last_name: updates.lastName,
      gender: updates.gender,
      dob: updates.dateOfBirth
    }
  });
  
  return updated;
}

// 3. Get User Addresses
async function getUserAddresses(userId) {
  const user = platformClient.application("app-id").user;
  
  const addresses = await user.getAddresses({ userId });
  return addresses;
}

// 4. Add New Address
async function addAddress(userId, addressData) {
  const user = platformClient.application("app-id").user;
  
  const address = await user.addAddress({
    userId: userId,
    body: {
      address_type: addressData.type, // "home" or "office"
      name: addressData.name,
      address: addressData.street,
      city: addressData.city,
      state: addressData.state,
      country: addressData.country,
      pincode: addressData.pincode,
      phone: addressData.phone
    }
  });
  
  return address;
}`

  const inventoryApiExample = `// Inventory Management API Operations

// 1. Get Inventory for Location
async function getLocationInventory(locationId, itemId) {
  const catalog = platformClient.catalog;
  
  const inventory = await catalog.getInventoryByLocation({
    locationId: locationId,
    itemId: itemId
  });
  
  console.log("Available quantity:", inventory.quantity);
  console.log("Price:", inventory.price);
  
  return inventory;
}

// 2. Update Inventory
async function updateInventory(locationId, itemId, quantity, price) {
  const catalog = platformClient.catalog;
  
  const updated = await catalog.updateInventory({
    locationId: locationId,
    itemId: itemId,
    body: {
      quantity: quantity,
      price: {
        effective: price.selling,
        marked: price.mrp,
        currency: "INR"
      }
    }
  });
  
  return updated;
}

// 3. Bulk Inventory Update
async function bulkUpdateInventory(updates) {
  const catalog = platformClient.catalog;
  
  // updates is array of { itemId, locationId, quantity, price }
  const result = await catalog.bulkInventoryUpdate({
    body: {
      items: updates.map(u => ({
        item_id: u.itemId,
        location_id: u.locationId,
        quantity: u.quantity,
        price: u.price
      }))
    }
  });
  
  console.log(\`Updated \${result.success_count} items\`);
  return result;
}`

  const orderApiExample = `// Order Management API Operations

// 1. Get Orders
async function getOrders(status, page = 1) {
  const order = platformClient.application("app-id").order;
  
  const orders = await order.getOrders({
    status: status, // "pending", "confirmed", "shipped", "delivered"
    pageSize: 20,
    pageNo: page
  });
  
  return orders;
}

// 2. Get Order Details
async function getOrderDetails(orderId) {
  const order = platformClient.application("app-id").order;
  
  const details = await order.getOrderById({ orderId });
  
  console.log("Order ID:", details.order_id);
  console.log("Status:", details.status);
  console.log("Total:", details.total_amount);
  console.log("Items:", details.items.length);
  
  return details;
}

// 3. Update Order Status
async function updateOrderStatus(orderId, status, statusData) {
  const order = platformClient.application("app-id").order;
  
  const updated = await order.updateOrderStatus({
    orderId: orderId,
    body: {
      status: status,
      ...statusData
    }
  });
  
  return updated;
}

// 4. Create Shipment
async function createShipment(orderId, items, addressId) {
  const order = platformClient.application("app-id").order;
  
  const shipment = await order.createShipment({
    orderId: orderId,
    body: {
      items: items,
      delivery_address_id: addressId,
      courier_partner: "bluedart"
    }
  });
  
  return shipment;
}`

  const errorHandlingExample = `// Proper Error Handling with Fynd APIs

async function safeApiCall() {
  try {
    const catalog = platformClient.application("app-id").catalog;
    const products = await catalog.getProducts({ pageSize: 20 });
    
    return {
      success: true,
      data: products
    };
    
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // API responded with error status
      console.error("API Error:", error.response.status);
      console.error("Message:", error.response.data.message);
      
      if (error.response.status === 401) {
        // Unauthorized - refresh token
        return { success: false, error: "Authentication failed" };
      }
      
      if (error.response.status === 404) {
        // Not found
        return { success: false, error: "Resource not found" };
      }
      
      if (error.response.status === 429) {
        // Rate limit exceeded
        return { success: false, error: "Too many requests" };
      }
      
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.request);
      return { success: false, error: "Network error" };
      
    } else {
      // Other errors
      console.error("Error:", error.message);
      return { success: false, error: error.message };
    }
  }
}

// Retry logic for transient failures
async function apiCallWithRetry(apiFunction, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiFunction();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(\`Retry \${attempt}/\${maxRetries} after \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}`

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Platform  APIs
          </h1>
          <p className="text-xl text-gray-600">
            Master Fynd Platform APIs for users, products, inventory, and more
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Introduction to Platform APIs
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Fynd Platform APIs provide programmatic access to all commerce functionality. Whether 
            you're building a custom storefront, integrating with external systems, or automating 
            business processes, the Platform APIs are your gateway to Fynd's commerce engine.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The APIs are organized into logical domains:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🛍️ Catalog APIs</h4>
              <p className="text-sm text-blue-800">
                Products, collections, categories, variants, attributes
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">👥 User APIs</h4>
              <p className="text-sm text-green-800">
                Authentication, profiles, addresses, preferences
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🛒 Cart & Checkout APIs</h4>
              <p className="text-sm text-purple-800">
                Shopping cart, coupons, payment, order placement
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">📦 Order APIs</h4>
              <p className="text-sm text-orange-800">
                Order management, shipments, tracking, returns
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">📊 Inventory APIs</h4>
              <p className="text-sm text-red-800">
                Stock levels, warehouses, locations, availability
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">💰 Payment APIs</h4>
              <p className="text-sm text-yellow-800">
                Payment gateways, transactions, refunds
              </p>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Authentication
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            Fynd Platform uses <strong>OAuth 2.0</strong> for authentication. You need API credentials 
            (API Key and API Secret) to generate access tokens.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
            <h4 className="font-semibold text-red-900 mb-2">🔐 Getting Credentials</h4>
            <ol className="text-sm text-red-800 space-y-1">
              <li>1. Log in to Fynd Platform dashboard</li>
              <li>2. Navigate to Settings → Developers → API Credentials</li>
              <li>3. Create a new API key for your application</li>
              <li>4. Copy the API Key and API Secret (keep them secure!)</li>
              <li>5. Note your Company ID and Application ID</li>
            </ol>
          </div>

          <CodeBlock 
            code={authExample}
            language="javascript"
            filename="Authentication Setup"
          />

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Security Best Practices</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• <strong>Never</strong> expose API secrets in frontend code</li>
              <li>• Store credentials in environment variables</li>
              <li>• Use server-side code for API calls with sensitive data</li>
              <li>• Rotate API keys periodically</li>
              <li>• Use different keys for development and production</li>
            </ul>
          </div>
        </section>

        {/* SDK vs APIs */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              SDK vs Direct REST API
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            You can interact with Fynd APIs in two ways:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">✅ Using SDK (Recommended)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Fynd provides official SDKs for JavaScript, Python, and other languages.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Type safety and autocomplete</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Automatic token management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Built-in error handling</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Less boilerplate code</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Consistent API interface</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct REST API</h3>
              <p className="text-sm text-gray-700 mb-3">
                Call APIs directly using HTTP clients like axios or fetch.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-600">•</span>
                  <span>More control over requests</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-600">•</span>
                  <span>Language agnostic</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-600">•</span>
                  <span>More boilerplate code</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-600">•</span>
                  <span>Manual token management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-600">•</span>
                  <span>Custom error handling needed</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Using the SDK</h3>
          <CodeBlock 
            code={sdkExample}
            language="javascript"
            filename="SDK Usage Example"
          />

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Using Direct REST API</h3>
          <CodeBlock 
            code={restApiExample}
            language="javascript"
            filename="Direct API Example"
          />
        </section>

        {/* Catalog APIs */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Catalog APIs - Products & Collections
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            The Catalog API is the most commonly used API. It provides access to products, 
            collections, categories, and all catalog-related data.
          </p>

          <CodeBlock 
            code={catalogApiExample}
            language="javascript"
            filename="Catalog API Examples"
          />
        </section> */}

        {/* User APIs */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              User Management APIs
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            User APIs handle authentication, profile management, addresses, and user preferences.
          </p>

          <CodeBlock 
            code={userApiExample}
            language="javascript"
            filename="User API Examples"
          />
        </section> */}

        {/* Inventory APIs */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Inventory Management APIs
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            Inventory APIs manage stock levels across multiple locations and warehouses.
          </p>

          <CodeBlock 
            code={inventoryApiExample}
            language="javascript"
            filename="Inventory API Examples"
          />
        </section> */}

        {/* Order APIs */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Order Management APIs
          </h2>

          <p className="text-gray-700 mb-6">
            Order APIs provide complete order lifecycle management from placement to delivery.
          </p>

          <CodeBlock 
            code={orderApiExample}
            language="javascript"
            filename="Order API Examples"
          />
        </section> */}

        {/* Error Handling */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Error Handling Best Practices
          </h2>

          <p className="text-gray-700 mb-6">
            Proper error handling is crucial for robust applications. Always handle different 
            error scenarios gracefully.
          </p>

          <CodeBlock 
            code={errorHandlingExample}
            language="javascript"
            filename="Error Handling Patterns"
          />

          <div className="mt-6 bg-red-50 border-l-4 border-red-600 p-4">
            <h4 className="font-semibold text-red-900 mb-2">Common HTTP Status Codes</h4>
            <div className="text-sm text-red-800 space-y-1">
              <div><code>200 OK</code> - Request successful</div>
              <div><code>400 Bad Request</code> - Invalid request parameters</div>
              <div><code>401 Unauthorized</code> - Authentication required/failed</div>
              <div><code>403 Forbidden</code> - Not authorized to access resource</div>
              <div><code>404 Not Found</code> - Resource doesn't exist</div>
              <div><code>429 Too Many Requests</code> - Rate limit exceeded</div>
              <div><code>500 Internal Server Error</code> - Server-side error</div>
            </div>
          </div>
        </section> */}

        {/* Best Practices */}
        <section className="mb-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">
            API Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Use SDK When Possible</h4>
              <p className="text-sm text-gray-300">
                SDKs handle authentication, retries, and error handling automatically.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Cache Responses</h4>
              <p className="text-sm text-gray-300">
                Cache product data, collections, and other static content to reduce API calls.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Use Pagination</h4>
              <p className="text-sm text-gray-300">
                Always paginate large result sets. Don't fetch all products at once.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Handle Rate Limits</h4>
              <p className="text-sm text-gray-300">
                Implement exponential backoff when rate limits are hit.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Validate Input</h4>
              <p className="text-sm text-gray-300">
                Validate data before sending to API to catch errors early.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Log Errors</h4>
              <p className="text-sm text-gray-300">
                Log all API errors with context for debugging and monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready for Workflows?</h3>
          <p className="text-blue-100 mb-6">
            Now that you understand Platform APIs, let's learn how to automate workflows with Boltic!
          </p>
          <a 
            href="/boltic"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Learn Boltic Workflows →
          </a>
        </div>
      </div>
    </PageLayout>
  )
}

