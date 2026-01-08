'use client'

import PageLayout from '@/components/PageLayout'
import { 
  ShoppingBag, 
  Server, 
  Workflow, 
  Zap, 
  Users, 
  Package,
  ArrowRight,
  Globe,
  Database,
  Webhook
} from 'lucide-react'

export default function OverviewPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fynd Platform Overview
          </h1>
          <p className="text-xl text-gray-600">
            Understanding the architecture, components, and technical flow of Fynd Commerce
          </p>
        </div>

        {/* What is Fynd */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What is Fynd?
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Fynd is a comprehensive <strong>omnichannel commerce platform</strong> that enables 
            businesses to build, manage, and scale their e-commerce operations. It provides a 
            complete ecosystem for creating modern storefronts, managing products and inventory, 
            processing orders, and automating workflows.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Unlike traditional e-commerce platforms, Fynd separates the <strong>presentation layer</strong> (storefront) 
            from the <strong>business logic layer</strong> (platform APIs), giving developers complete flexibility 
            to build custom experiences while leveraging robust backend services.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2">Key Philosophy</h4>
            <p className="text-blue-800 text-sm">
              Fynd follows a headless commerce approach where the frontend (storefront) and backend 
              (platform) are decoupled, connected via APIs. This allows you to use any frontend 
              technology while still benefiting from Fynd's powerful commerce engine.
            </p>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Platform Architecture
          </h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white mb-6">
            <div className="space-y-6">
              {/* User Layer */}
              <div className="flex items-center justify-center">
                <div className="bg-blue-500 px-8 py-4 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-center font-semibold">End User / Customer</div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>

              {/* Storefront Layer */}
              <div className="flex items-center justify-center">
                <div className="bg-purple-500 px-8 py-6 rounded-lg">
                  <Globe className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-center font-semibold mb-1">Storefront (FDK)</div>
                  <div className="text-xs text-purple-100">Themes, Sections, Components</div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>

              {/* API Layer */}
              <div className="flex items-center justify-center gap-4">
                <div className="bg-green-500 px-6 py-4 rounded-lg flex-1 max-w-xs">
                  <Server className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-center font-semibold mb-1">Platform APIs</div>
                  <div className="text-xs text-green-100">REST / GraphQL / SDK</div>
                </div>
                <div className="bg-orange-500 px-6 py-4 rounded-lg flex-1 max-w-xs">
                  <Webhook className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-center font-semibold mb-1">Events & Webhooks</div>
                  <div className="text-xs text-orange-100">Real-time notifications</div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>

              {/* Backend Services */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 px-4 py-3 rounded-lg">
                  <Package className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-center text-sm font-semibold">Core Services</div>
                  <div className="text-xs text-gray-300 text-center">Products, Orders, Users</div>
                </div>
                <div className="bg-gray-700 px-4 py-3 rounded-lg">
                  <Workflow className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-center text-sm font-semibold">Boltic Workflows</div>
                  <div className="text-xs text-gray-300 text-center">Automation & Integration</div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>

              {/* Database */}
              <div className="flex items-center justify-center">
                <div className="bg-red-500 px-8 py-4 rounded-lg">
                  <Database className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-center font-semibold">Fynd Platform Database</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm italic text-center">
            Data flows from users through the storefront, via APIs, through business logic, to the database and back
          </p>
        </section>

        {/* Core Components */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Core Components Explained
          </h2>

          <div className="space-y-6">
            {/* Storefront */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    1. Storefront (FDK)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    The <strong>Fynd Development Kit (FDK)</strong> is the frontend framework for building 
                    e-commerce storefronts. It uses a theme-based architecture where:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Themes</strong> define the overall look and structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Sections</strong> are reusable components (hero banner, product grid, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Blocks</strong> are configurable units within sections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Settings</strong> allow non-technical users to customize via theme editor</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-purple-50 p-3 rounded">
                    <p className="text-sm text-purple-900">
                      <strong>Tech Stack:</strong> React/Vue.js, component-based architecture, 
                      responsive design, server-side rendering (SSR) support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform APIs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    2. Platform  APIs
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Fynd provides comprehensive  APIs to interact with all platform features:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Catalog APIs:</strong> Products, collections, categories, variants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>User APIs:</strong> Authentication, profiles, addresses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Cart & Order APIs:</strong> Shopping cart, checkout, order management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Inventory APIs:</strong> Stock levels, warehouses, locations</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-green-50 p-3 rounded">
                    <p className="text-sm text-green-900">
                      <strong>Access Methods:</strong> Direct API calls, JavaScript SDK, Python SDK, 
                      GraphQL queries. Authentication via OAuth 2.0 or API keys.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events & Webhooks */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    3. Events & Webhooks
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Fynd emits real-time events when actions occur on the platform. You can subscribe 
                    to these events to trigger custom logic:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>User events:</strong> User created, updated, logged in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Order events:</strong> Order placed, confirmed, shipped, delivered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Inventory events:</strong> Stock updated, product added</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Payment events:</strong> Payment initiated, completed, failed</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-orange-50 p-3 rounded">
                    <p className="text-sm text-orange-900">
                      <strong>Use Cases:</strong> Send confirmation emails, sync with external systems, 
                      update analytics, trigger inventory replenishment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boltic */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Workflow className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    4. Boltic Workflows
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Boltic is Fynd's workflow automation platform. It allows you to create complex 
                    business logic without writing backend code:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Visual workflow builder:</strong> Drag-and-drop interface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Event listeners:</strong> React to platform events automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Data transformations:</strong> Validate, filter, and modify data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Third-party integrations:</strong> Connect to Slack, email, CRM, etc.</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-blue-50 p-3 rounded">
                    <p className="text-sm text-blue-900">
                      <strong>Common Workflows:</strong> Inventory sync from ERP, order notifications to Slack, 
                      customer data enrichment, automated refund processing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Flow */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">
            Real-World Example Flow
          </h2>
          <p className="mb-6 text-blue-100">
            Let's trace a complete user journey through the Fynd ecosystem:
          </p>

          <div className="space-y-4 bg-white/10 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">User Visits Storefront</h4>
                <p className="text-sm text-blue-100">
                  Customer lands on your FDK-powered storefront. The page is rendered with custom 
                  theme sections showing hero banner, featured products, and promotions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Browse Products</h4>
                <p className="text-sm text-blue-100">
                  Product listing section makes API call to Catalog API to fetch products with 
                  filters, pagination, and sorting. Data is rendered in a responsive grid.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Add to Cart</h4>
                <p className="text-sm text-blue-100">
                  When user adds item, storefront calls Cart API. Platform validates inventory, 
                  pricing, and creates cart session. Real-time inventory check prevents overselling.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Checkout & Payment</h4>
                <p className="text-sm text-blue-100">
                  User proceeds to checkout. Payment API integrates with payment gateway. 
                  Order is created in the system.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-semibold mb-1">Event Triggered</h4>
                <p className="text-sm text-blue-100">
                  Platform emits "order.created" webhook event with full order details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                6
              </div>
              <div>
                <h4 className="font-semibold mb-1">Boltic Workflow Executes</h4>
                <p className="text-sm text-blue-100">
                  Boltic workflow listens to order event, validates data, logs to database, 
                  sends confirmation email via SendGrid, and posts notification to Slack channel.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                7
              </div>
              <div>
                <h4 className="font-semibold mb-1">Inventory Updated</h4>
                <p className="text-sm text-blue-100">
                  Another Boltic workflow updates external ERP system via API, ensuring 
                  inventory is synced across all channels (omnichannel sync).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Architecture */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why This Architecture?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Flexibility</h3>
              <p className="text-gray-700 text-sm">
                Build custom storefronts with any technology. Not locked into templates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Scalability</h3>
              <p className="text-gray-700 text-sm">
                Frontend and backend scale independently based on traffic needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Maintainability</h3>
              <p className="text-gray-700 text-sm">
                Clear separation of concerns. Update UI without touching backend logic.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Automation</h3>
              <p className="text-gray-700 text-sm">
                Boltic handles complex workflows without custom backend development.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Omnichannel</h3>
              <p className="text-gray-700 text-sm">
                Single backend serves web, mobile, in-store, and marketplace channels.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Developer Experience</h3>
              <p className="text-gray-700 text-sm">
                Modern tools, comprehensive docs, SDKs in multiple languages.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Hands-On?</h3>
          <p className="text-gray-300 mb-6">
            Now that you understand the architecture, let's start building!
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="/storefront"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition text-center"
            >
              Start with Storefront Development →
            </a>
            <a 
              href="/platform-api"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition text-center"
            >
              Explore Platform APIs →
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

