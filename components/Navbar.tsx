'use client'

import Link from 'next/link'
import { Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">F</span>
            </div>
            <span>Fynd Bootcamp</span>
          </Link> */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <div className="flex items-center gap-2 cursor-pointer"><span className="text-black font-black text-base tracking-tight font-[600]">devx</span><span className="text-gray-500 text-sm font-light">×</span><span className="text-black font-black text-base tracking-tight font-[600]">fynd</span></div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/overview" className="text-gray-600 hover:text-blue-600 transition">
              Overview
            </Link>
            <Link href="/storefront" className="text-gray-600 hover:text-blue-600 transition">
              Storefront
            </Link>
            <Link href="/platform-api" className="text-gray-600 hover:text-blue-600 transition">
              Platform API
            </Link>
            <Link href="/boltic" className="text-gray-600 hover:text-blue-600 transition">
              Boltic
            </Link>
            <Link href="/references" className="text-gray-600 hover:text-blue-600 transition">
              References
            </Link>
            <Link 
              href="/assignments" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Assignments
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/overview" className="block py-2 text-gray-600 hover:text-blue-600">
              Overview
            </Link>
            <Link href="/storefront" className="block py-2 text-gray-600 hover:text-blue-600">
              Storefront
            </Link>
            <Link href="/platform-api" className="block py-2 text-gray-600 hover:text-blue-600">
              Platform API
            </Link>
            <Link href="/boltic" className="block py-2 text-gray-600 hover:text-blue-600">
              Boltic
            </Link>
            <Link href="/references" className="block py-2 text-gray-600 hover:text-blue-600">
              References
            </Link>
            <Link href="/assignments" className="block py-2 text-blue-600 font-semibold">
              Assignments
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

