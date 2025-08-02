"use client"
import React, { useState } from 'react'
import Header from '../components/Header'

const SchoolDetailsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('School details:', formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="dashboard" showNavigation={false} />
      <main className="flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-teal-700">🏫 School Details</h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: 'schoolName', label: 'School Name' },
              { name: 'address', label: 'Address' },
              { name: 'zipCode', label: 'Zip Code' }
            ].map(({ name, label }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  id={name}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={(formData as any)[name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['city', 'state'].map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    placeholder={`Enter ${field}`}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default SchoolDetailsPage
