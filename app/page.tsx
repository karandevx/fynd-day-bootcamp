'use client'

import Link from 'next/link'
import { 
  ShoppingBag, 
  Code2, 
  Workflow, 
  BookOpen, 
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold">
              <Zap className="w-4 h-4" />
              <span>Live Hands-On Training</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Fynd  Bootcamp
            {/* <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-4xl">
            Bootcamp
            </span> */}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master the Fynd Commerce Platform through interactive tutorials, 
            hands-on coding exercises, and real-world assignments. Learn Storefront development, 
            Platform APIs, and Boltic workflows.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link 
              href="/overview"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/references"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              References
            </Link>
            <Link 
              href="/assignments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              View Assignments
            </Link>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Master
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Storefront Development
              </h3>
              <p className="text-gray-600 mb-4">
                Build custom themes and sections using FDK. Learn theme structure, 
                configuration, and best practices for responsive design.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Theme architecture & folder structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Custom sections with settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Theme editor integration</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Platform APIs
              </h3>
              <p className="text-gray-600 mb-4">
                Integrate with Fynd Platform APIs for users, products, inventory, 
                and more. Master authentication and SDK usage.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Authentication & authorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>SDK vs API usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Common API patterns</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Workflow className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Boltic Workflows
              </h3>
              <p className="text-gray-600 mb-4">
                Build automated workflows with Boltic. Handle events, validate data, 
                and integrate with external systems.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Event listeners & webhooks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Data validation & transformation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Third-party integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Learning Journey
          </h2>
          
          <div className="space-y-4">
            <Link href="/overview" className="block group">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4 border-blue-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                        Fynd Platform Overview
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Understand the architecture, components, and data flow
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            <Link href="/storefront" className="block group">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4 border-purple-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition">
                        Storefront & FDK
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Learn theme development, sections, and configuration
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            <Link href="/storefront/banner-tutorial" className="block group">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition">
                        Hands-On: Custom Banner Section
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Build your first custom section with step-by-step guidance
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            <Link href="/platform-api" className="block group">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4 border-orange-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition">
                        Platform  APIs
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Master API authentication, SDK usage, and common patterns
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            <Link href="/boltic" className="block group">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4 border-red-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition">
                        Hands-On: Boltic Workflow
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Build an automated user creation workflow with validation
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            <Link href="/assignments" className="block group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                      6
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        Complete Your Assignments
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Apply your knowledge with 2 comprehensive assignments
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        {/* <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6" />
              <h3 className="text-2xl font-bold">Quick Access</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Jump directly to what you need
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/storefront/banner-tutorial"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition"
              >
                <h4 className="font-semibold mb-1">Banner Section Tutorial</h4>
                <p className="text-sm text-gray-300">Step-by-step guide with code</p>
              </Link>
              <Link 
                href="/boltic"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition"
              >
                <h4 className="font-semibold mb-1">Boltic Workflow Guide</h4>
                <p className="text-sm text-gray-300">Build your first workflow</p>
              </Link>
              <Link 
                href="/assignments/storefront"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition"
              >
                <h4 className="font-semibold mb-1">Storefront Assignment</h4>
                <p className="text-sm text-gray-300">Collection section task</p>
              </Link>
              <Link 
                href="/assignments/boltic"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition"
              >
                <h4 className="font-semibold mb-1">Boltic Assignment</h4>
                <p className="text-sm text-gray-300">Inventory sync workflow</p>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

