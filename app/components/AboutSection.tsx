"use client"
import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold text-teal-700">About Us</h2>
        </header>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-teal-600">SchoolConnect</span> is dedicated to providing a nurturing and challenging environment where students thrive academically, socially, and emotionally. Our experienced faculty and state-of-the-art facilities ensure a comprehensive educational experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/gyF8H9gk0q.png"
              alt="School facility"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/OPbPQzSBn7.png"
              alt="Students learning"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/o2y3n0DXAd.png"
              alt="School activities"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
