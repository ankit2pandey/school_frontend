"use client"
import React from 'react'
import Link from 'next/link'

interface HeaderProps {
  variant?: 'landing' | 'auth' | 'dashboard'
  showNavigation?: boolean
}

const Header: React.FC<HeaderProps> = ({ variant = 'landing', showNavigation = true }) => {
  const logoText =
    variant === 'dashboard' ? 'Academics Hub' :
    variant === 'auth' ? 'ConnectHub' : 'SchoolConnect'

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/DoQv9bAwKy.svg"
            alt="SchoolConnect Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-teal-700">{logoText}</span>
        </Link>

        {showNavigation && (
          <nav className="flex items-center space-x-6">
            {variant === 'landing' && (
              <>
                <Link href="#" className="text-gray-600 hover:text-teal-600 transition">Resources</Link>
                <Link href="#" className="text-gray-600 hover:text-teal-600 transition">Contact</Link>
                <Link href="/login" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition">
                  Login
                </Link>
              </>
            )}

            {variant === 'auth' && (
              <>
                <Link href="/" className="text-gray-600 hover:text-teal-600 transition">Home</Link>
                <Link href="#" className="text-gray-600 hover:text-teal-600 transition">About</Link>
                <Link href="#" className="text-gray-600 hover:text-teal-600 transition">Contact</Link>
                <Link href="/login" className="border border-teal-600 text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-md transition">
                  Log In
                </Link>
              </>
            )}

            {variant === 'dashboard' && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-teal-600 font-medium">Dashboard</Link>
                <Link href="#" className="text-gray-700 hover:text-teal-600 font-medium">Courses</Link>
                <Link href="#" className="text-gray-700 hover:text-teal-600 font-medium">Grades</Link>
                <Link href="#" className="text-gray-700 hover:text-teal-600 font-medium">Attendance</Link>
                <div className="ml-4">
                  <img
                    src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/VzB85zQV7i.png"
                    alt="Profile"
                    className="h-8 w-8 rounded-full border border-gray-300"
                  />
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
