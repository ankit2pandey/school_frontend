"use client"
import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        <nav className="flex space-x-6 text-sm text-gray-600">
          <Link href="#" className="hover:text-teal-600 transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-teal-600 transition">Terms of Service</Link>
          <Link href="#" className="hover:text-teal-600 transition">Contact Us</Link>
        </nav>

        <p className="text-sm text-gray-500 text-center md:text-right">
          © 2023 <span className="font-semibold text-teal-700">SchoolConnect</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
