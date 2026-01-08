'use client'

import PageLayout from '@/components/PageLayout'
import Link from 'next/link'
import { ShoppingBag, Workflow, Clock, Award } from 'lucide-react'

export default function AssignmentsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assignments
          </h1>
          <p className="text-xl text-gray-600">
            Apply your knowledge with these comprehensive coding assignments
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Assignment Overview
          </h2>
          <p className="text-blue-100 mb-6">
            You have <strong>2 assignments</strong> to complete. Each assignment tests different 
            aspects of the Fynd platform and has a detailed scoring rubric. Take your time, 
            follow best practices, and build production-ready solutions.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📝 Detailed Requirements</h4>
              <p className="text-sm text-blue-100">
                Each assignment has clear, step-by-step requirements
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Scoring Rubrics</h4>
              <p className="text-sm text-blue-100">
                Know exactly how your work will be evaluated
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">💡 Example Solutions</h4>
              <p className="text-sm text-blue-100">
                Reference solutions available after attempting
              </p>
            </div>
          </div>
        </section>

        {/* Assignment Cards */}
        <div className="space-y-8">
          {/* Storefront Assignment */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Assignment 1: Storefront Development</h3>
                  <p className="text-purple-100">Build a custom collection section</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Estimated: 1-1.5 hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  {/* <span>Total Points: 35</span> */}
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">What You'll Build:</h4>
              <p className="text-gray-700 mb-4">
                Create a custom theme section that accepts a collection as input, fetches products 
                via Platform API, and renders them on the storefront with multiple layout options.
              </p>

              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span>Section header/title configuration</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span>Background color customization</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span>CTA button with customizable text, link, and color</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span>Layout options: Grid (stack) or Horizontal scroll (carousel)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span>Responsive design and performance optimization</span>
                </li>
              </ul>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
                <h4 className="font-semibold text-purple-900 mb-2">Scoring Breakdown</h4>
                <div className="space-y-1 text-sm text-purple-800">
                  <div className="flex justify-between">
                    <span>• Section header/title</span>
                    {/* <span className="font-semibold">5 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• Background color</span>
                    {/* <span className="font-semibold">5 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• CTA button (text, link, color)</span>
                    {/* <span className="font-semibold">10 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• Layout options (grid + carousel)</span>
                    {/* <span className="font-semibold">15 points</span> */}
                  </div>
                  {/* <div className="border-t border-purple-300 mt-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>35 points</span>
                  </div> */}
                </div>
              </div>

              <Link 
                href="/assignments/storefront"
                className="inline-block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition"
              >
                View Full Assignment →
              </Link>
            </div>
          </div>

          {/* Boltic Assignment */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Workflow className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Assignment 2: Boltic Workflow</h3>
                  <p className="text-orange-100">Build an inventory sync workflow</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Estimated: 1-1.5 hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  {/* <span>Total Points: 40 (+10 bonus)</span> */}
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">What You'll Build:</h4>
              <p className="text-gray-700 mb-4">
                Create a Boltic workflow that listens to inventory sync events, validates data, 
                logs to a database, updates inventory on Fynd Platform, and sends notifications.
              </p>

              <h4 className="font-semibold text-gray-900 mb-3">Workflow Steps:</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>Listen to inventory sync event (Postman trigger)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>Log event in Boltic table with 'pending' status</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>Validate payload (if failed → status 'Error')</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>Update inventory on Fynd Platform</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>Update status to 'Success'</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span><strong>Bonus:</strong> Slack alerts for success/failure</span>
                </li>
              </ul>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6">
                <h4 className="font-semibold text-orange-900 mb-2">Scoring Breakdown</h4>
                <div className="space-y-1 text-sm text-orange-800">
                  <div className="flex justify-between">
                    <span>• Event listener setup</span>
                    {/* <span className="font-semibold">10 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• Payload validation</span>
                    {/* <span className="font-semibold">5 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• Error handling</span>
                    {/* <span className="font-semibold">5 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• Inventory update (Platform API)</span>
                    {/* <span className="font-semibold">10 points</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span>• Database logging & status tracking</span>
                    {/* <span className="font-semibold">10 points</span> */}
                  </div>
                  <div className="flex justify-between text-green-800">
                    <span>• <strong>Bonus:</strong> Slack integration</span>
                    {/* <span className="font-semibold">+10 points</span> */}
                  </div>
                  {/* <div className="border-t border-orange-300 mt-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>40 points (+10 bonus)</span>
                  </div> */}
                </div>
              </div>

              <Link 
                href="/assignments/boltic"
                className="inline-block w-full text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition"
              >
                View Full Assignment →
              </Link>
            </div>
          </div>
        </div>

        {/* Submission Guidelines */}
        {/* <section className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Submission Guidelines
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>1. Code Quality:</strong> Write clean, well-documented code with comments 
              explaining your logic.
            </p>
            <p>
              <strong>2. Best Practices:</strong> Follow the best practices covered in the tutorials 
              (validation, error handling, performance optimization).
            </p>
            <p>
              <strong>3. Testing:</strong> Test your solutions thoroughly with different scenarios, 
              including edge cases.
            </p>
            <p>
              <strong>4. Documentation:</strong> Include a README explaining how to run your code 
              and what you've implemented.
            </p>
            <p>
              <strong>5. Repository:</strong> Push your code to a Git repository and share the link.
            </p>
          </div>
        </section> */}

        {/* Tips for Success */}
        <section className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Tips for Success
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Review Tutorials First</h4>
              <p className="text-sm text-gray-300">
                Go through all tutorials before starting assignments. They contain all the 
                knowledge you need.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Start with Requirements</h4>
              <p className="text-sm text-gray-300">
                Read all requirements carefully and create a checklist. Don't skip any features.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Test Incrementally</h4>
              <p className="text-sm text-gray-300">
                Build and test one feature at a time. Don't try to implement everything at once.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Ask Questions</h4>
              <p className="text-sm text-gray-300">
                If you're stuck, refer to documentation or ask for help. Don't waste hours debugging alone.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

