'use client'

import PageLayout from '@/components/PageLayout'
import { ExternalLink, BookOpen, Code2, Layers } from 'lucide-react'

export default function ReferencesPage() {
  const references = [
    {
      category: "FDK & Themes",
      icon: Layers,
      color: "purple",
      links: [
        {
          title: "FDK Documentation - Get Started",
          description: "Complete guide to getting started with Fynd Development Kit for building custom themes",
          url: "https://docs.fynd.com/partners/commerce/themes-doc/get-started",
        },
        {
          title: "Section Input Documentation",
          description: "Learn about sections, their configuration, input types, and how to build custom sections",
          url: "https://docs.fynd.com/partners/commerce/themes-doc/key-concepts/sections/",
        },
      ]
    },
    {
      category: "Platform APIs",
      icon: Code2,
      color: "blue",
      links: [
        {
          title: "Platform API Client Libraries",
          description: "SDK documentation for Platform APIs including authentication, catalog, users, and more",
          url: "https://docs.fynd.com/partners/commerce/sdk/latest/platform/client-libraries",
        },
      ]
    },
    {
      category: "Additional Resources",
      icon: BookOpen,
      color: "green",
      links: [
        {
          title: "Fynd Platform Documentation",
          description: "Main documentation portal for all Fynd Platform features and APIs",
          url: "https://docs.fynd.com",
        },
        {
          title: "Partner Portal",
          description: "Access partner resources, manage applications, and view analytics",
          url: "https://partners.fynd.com",
        },
      ]
    },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "hover:border-purple-400",
        iconBg: "bg-purple-50",
      },
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:border-blue-400",
        iconBg: "bg-blue-50",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        hover: "hover:border-green-400",
        iconBg: "bg-green-50",
      },
    }
    return colors[color] || colors.blue
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Reference Links
          </h1>
          <p className="text-xl text-gray-600">
            Essential documentation and resources for Fynd Platform development
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Official Documentation
          </h2>
          <p className="text-blue-100 mb-4">
            These links point to the official Fynd Platform documentation. Use them as your 
            primary reference when building applications, themes, and integrations.
          </p>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-blue-100">
              💡 <strong>Tip:</strong> Bookmark these pages for quick access. The documentation 
              is regularly updated with new features and best practices.
            </p>
          </div>
        </section>

        {/* Reference Categories */}
        <div className="space-y-8">
          {references.map((category, idx) => {
            const Icon = category.icon
            const colors = getColorClasses(category.color)

            return (
              <section key={idx} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.links.map((link, linkIdx) => (
                    <a
                      key={linkIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-6 border-2 ${colors.border} ${colors.hover} rounded-lg transition group`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold text-gray-900 mb-2 group-hover:${colors.text} transition`}>
                            {link.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {link.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-mono">{link.url}</span>
                          </div>
                        </div>
                        <ExternalLink className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition`} />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Quick Tips */}
        <section className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Using the Documentation Effectively
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📚 Start with Get Started</h4>
              <p className="text-sm text-gray-300">
                Begin with the "Get Started" guides to understand the basics before 
                diving into specific features.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🔍 Use Search</h4>
              <p className="text-sm text-gray-300">
                The documentation has a powerful search feature. Use it to quickly 
                find specific APIs or concepts.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">💻 Try Examples</h4>
              <p className="text-sm text-gray-300">
                Most documentation pages include code examples. Copy them and 
                experiment in your own projects.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🔄 Check Updates</h4>
              <p className="text-sm text-gray-300">
                Documentation is updated regularly. Check back periodically for 
                new features and improvements.
              </p>
            </div>
          </div>
        </section>

        {/* Back to Learning */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            📖 Continue Your Learning Journey
          </h3>
          <p className="text-blue-800 text-sm mb-4">
            These reference links complement the tutorials in this portal. Use them together 
            for the best learning experience.
          </p>
          <div className="flex gap-4">
            <a 
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              ← Back to Home
            </a>
            <a 
              href="/assignments"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View Assignments →
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

