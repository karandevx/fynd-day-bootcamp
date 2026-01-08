import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fynd Bootcamp',
  description: 'Complete hands-on training for Fynd Commerce Platform',
  icons: {
    icon: '/favicon1.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon1.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

