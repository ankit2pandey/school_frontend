"use client"
import Link from 'next/link'
import Header from '../components/Header'
import React, { useEffect, useState } from "react";


 



const WelcomePage: React.FC = () => {
   const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    } else {
      console.warn("No userId found in localStorage");
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-teal-100 text-gray-900">
      <Header variant="auth" />

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-teal-700 mb-2 animate-fade-in">
              Welcome to Lakeside High
            </h1>
            <p className="text-gray-600 text-sm">
              School ID: <span className="font-medium text-gray-800">{userId}</span>
            </p>
          </header>

          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full text-center py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition"
            >
              Login
            </Link>

            <Link
              href="/school"
              className="block w-full text-center py-2 px-4 bg-white border border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold rounded-md transition"
            >
              School Details
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WelcomePage
