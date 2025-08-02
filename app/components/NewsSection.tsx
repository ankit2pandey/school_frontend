"use client"
import React from 'react'
import Link from 'next/link'

interface NewsItem {
  id: string
  date: string
  title: string
  description: string
  image: string
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    date: 'October 26, 2023',
    title: 'Upcoming School Fair',
    description: 'Join us for our annual School Fair on November 15th. Activities include student showcases, games, and food stalls.',
    image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/QBHKS0erxk.png'
  },
  {
    id: '2',
    date: 'October 20, 2023',
    title: 'Parent-Teacher Conferences',
    description: 'Parent-Teacher Conferences will be held on November 1st and 2nd. Please schedule your appointments online.',
    image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/qjFjmLADk5.png'
  },
  {
    id: '3',
    date: 'October 15, 2023',
    title: 'New Science Lab Opening',
    description: 'Our new state-of-the-art science lab is now open, providing students with enhanced learning opportunities.',
    image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-02/ZLqSut4AuX.png'
  }
]

const NewsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-teal-700">📰 Latest News & Announcements</h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-2">
                <time className="block text-sm text-gray-500">{item.date}</time>
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="#"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md transition"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
