"use client"
import React from 'react'
import Link from 'next/link'

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
      <img
        src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/jPOwQdjPOd.png"
        alt="Students in classroom"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      
      <div className="absolute inset-0  bg-opacity-40" />

      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md animate-fade-in">
          Welcome to SchoolConnect
        </h1>
        <p className="text-lg md:text-xl mb-6 leading-relaxed animate-fade-in delay-150">
          Empowering students for a brighter future through innovative education and a supportive community.
        </p>
        <Link
          href="/signup"
          className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-md font-semibold rounded-md transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
