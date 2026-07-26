import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Hire Me Bro',
  description: 'Frontend scaffold',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>
      </body>
    </html>
  )
}
