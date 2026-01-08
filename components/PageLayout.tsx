'use client'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export default function PageLayout({ children, showSidebar = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-0 md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

