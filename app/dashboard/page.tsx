"use client"
import React from 'react'
import WelcomePage from './WelcomePage'

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomePage />

      <div className="px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <section className="bg-white rounded-xl shadow-md p-6">
            <header className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">School Name</p>
                <p className="text-lg font-semibold text-teal-800">Evergreen High</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-semibold text-teal-800">123 Maple Street, Springfield</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Contact</p>
                <p className="text-lg font-semibold text-teal-800">(555) 123-4567</p>
              </div>
            </div>
          </section>

          {/* Staff Management */}
          <SectionBlock title="👩‍🏫 Staff Management">
            <DataTable
              headers={["Name", "Role", "Department", "Actions"]}
              rows={[
                ["Dr. Emily Carter", "Principal", "Administration"],
                ["Mr. David Lee", "Teacher", "Science"],
                ["Ms. Sarah Jones", "Teacher", "Mathematics"],
              ]}
            />
            <ActionButton label="Add Staff" />
          </SectionBlock>

          {/* Course Management */}
          <SectionBlock title="📚 Course Management">
            <DataTable
              headers={["Course Name", "Instructor", "Credits", "Actions"]}
              rows={[
                ["Biology 101", "Mr. David Lee", "3"],
                ["Algebra 201", "Ms. Sarah Jones", "4"],
                ["History 301", "Dr. Robert Brown", "3"],
              ]}
            />
            <ActionButton label="Add Course" />
          </SectionBlock>

          {/* Student Management */}
          <SectionBlock title="🎓 Student Management">
            <DataTable
              headers={["Name", "Grade", "Major", "Actions"]}
              rows={[
                ["Alice Thompson", "11", "Science"],
                ["Bob Williams", "12", "Mathematics"],
                ["Charlie Davis", "10", "History"],
              ]}
            />
            <ActionButton label="Add Student" />
          </SectionBlock>

        </div>
      </div>
    </div>
  )
}

export default DashboardPage

const SectionBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
    {children}
  </section>
)

const DataTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-200 rounded-md">
      <thead className="bg-gray-100 text-gray-700 text-sm">
        <tr>
          {headers.map((head, i) => (
            <th key={i} className="px-4 py-2 text-left">{head}</th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm text-gray-600">
        {rows.map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2">{cell}</td>
            ))}
            <td className="px-4 py-2">
              <button className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ActionButton = ({ label }: { label: string }) => (
  <div className="mt-4">
    <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition">
      {label}
    </button>
  </div>
)
