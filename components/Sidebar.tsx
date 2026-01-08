'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Code2, 
  Workflow, 
  ClipboardCheck,
  ChevronRight,
  BookOpen,
  ExternalLink
} from 'lucide-react'

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Overview', href: '/overview', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Storefront',
    items: [
      { name: 'FDK Introduction', href: '/storefront', icon: ShoppingBag },
      { name: 'Banner Tutorial', href: '/storefront/banner-tutorial', icon: BookOpen },
    ]
  },
  {
    title: 'Platform',
    items: [
      { name: 'APIs', href: '/platform-api', icon: Code2 },
    ]
  },
  {
    title: 'Boltic',
    items: [
      { name: 'Workflow Guide', href: '/boltic', icon: Workflow },
    ]
  },
  {
    title: 'Assignments',
    items: [
      { name: 'All Assignments', href: '/assignments', icon: ClipboardCheck },
      { name: 'Storefront Task', href: '/assignments/storefront', icon: ShoppingBag },
      { name: 'Boltic Task', href: '/assignments/boltic', icon: Workflow },
    ]
  },
  {
    title: 'Resources',
    items: [
      { name: 'References', href: '/references', icon: ExternalLink },
    ]
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="flex-1">{item.name}</span>
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

