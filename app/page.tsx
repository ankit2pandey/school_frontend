"use client"
import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import HeroSection from '@/app/components/HeroSection'
import AboutSection from '@/app/components/AboutSection'
import NewsSection from '@/app/components/NewsSection'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header variant="landing" />

      <main className="space-y-16">
        <HeroSection />

        <section className="px-4 md:px-8">
          <AboutSection />
        </section>

        <section className="bg-gray-50 px-4 md:px-8 py-12">
          <NewsSection />
        </section>

        <section className="bg-teal-600 text-white py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Future of Learning?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-6">
            SchoolConnect empowers students, educators, and families to connect, grow, and succeed together. Discover how our platform transforms education into a collaborative journey.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-teal-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
