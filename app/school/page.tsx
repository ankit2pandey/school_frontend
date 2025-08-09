"use client"
import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import toast, { Toaster } from "react-hot-toast"

const SchoolDetailsPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    affiliationNumber: "",
    board: "CBSE",
    medium: "English",
    establishmentYear: 2005,
    schoolType: "Private",
    contactPhone: "",
    contactEmail: "",
    website: "",
    logoUrl: "",
    address: {
      street: "",
      area: "",
      city: "",
      district: "",
      state: "",
      country: "",
      postalCode: ""
    }
  })

  useEffect(() => {
    const storedId = localStorage.getItem("userId")
    if (storedId) {
      setUserId(storedId)
      setFormData(prev => ({ ...prev, code: storedId }))
    } else {
      console.warn("No userId found in localStorage")
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name in formData.address) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }))
    } else if (name === "establishmentYear") {
      setFormData(prev => ({ ...prev, [name]: Number(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading("Submitting school details...")

    try {
      const response = await fetch("http://localhost:4000/api/school/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      toast.dismiss()

      if (response.ok) {
        toast.success("✅ School registered successfully!")
        console.log("School registered:", result)
      } else {
        toast.error("❌ Registration failed. Please check your inputs.")
        console.error("Validation errors:", result.error)
      }
    } catch (error) {
      toast.dismiss()
      toast.error("⚠️ Something went wrong while submitting the form.")
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <Header variant="dashboard" showNavigation={false} />
      <main className="flex justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-teal-700 text-center mb-8">🏫 Register School</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="name" label="School Name" value={formData.name} handleChange={handleChange} />
                <InputField name="code" label="School Code" value={formData.code} disabled />
                <InputField name="affiliationNumber" label="Affiliation Number" value={formData.affiliationNumber} handleChange={handleChange} />
                <SelectField name="board" label="Board" value={formData.board} options={["CBSE", "ICSE", "STATE", "IB", "CAMBRIDGE"]} handleChange={handleChange} />
                <SelectField name="medium" label="Medium" value={formData.medium} options={["English", "Hindi", "Regional"]} handleChange={handleChange} />
                <InputField name="establishmentYear" label="Establishment Year" value={formData.establishmentYear} type="number" handleChange={handleChange} />
                <SelectField name="schoolType" label="School Type" value={formData.schoolType} options={["Private", "Government", "Aided", "International"]} handleChange={handleChange} />
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="contactPhone" label="Phone Number" value={formData.contactPhone} handleChange={handleChange} maxLength={10} />
                <InputField name="contactEmail" label="Email Address" value={formData.contactEmail} type="email" handleChange={handleChange} />
                <InputField name="website" label="Website URL" value={formData.website} handleChange={handleChange} />
                <InputField name="logoUrl" label="Logo URL" value={formData.logoUrl} handleChange={handleChange} />
              </div>
            </section>

            {/* Address Info */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["street", "area", "city", "district", "state", "country", "postalCode"].map(field => (
                  <InputField
                    key={field}
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData.address[field as keyof typeof formData.address]}
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                Register School
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

// ✅ InputField Component
const InputField = ({
  name,
  label,
  value,
  handleChange,
  type = "text",
  disabled = false,
  maxLength
}: {
  name: string
  label: string
  value: any
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
  maxLength?: number
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      maxLength={maxLength}
      placeholder={`Enter ${label}`}
      className={`w-full px-4 py-2 border ${disabled ? "bg-gray-100" : "bg-white"} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
      required={!disabled}
    />
  </div>
)

// ✅ SelectField Component
const SelectField = ({
  name,
  label,
  value,
  options,
  handleChange
}: {
  name: string
  label: string
  value: string
  options: string[]
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      required
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)

export default SchoolDetailsPage
