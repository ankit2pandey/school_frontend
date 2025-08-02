"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link'

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    console.log('Signup attempt:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-teal-200 flex flex-col">
      <Header variant="auth" />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create your account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {['username', 'email', 'password', 'confirmPassword'].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('confirmPassword', 'Confirm Password')}
                </label>
                <input
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field.replace('confirmPassword', 'confirm password')}`}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

export default SignupPage
