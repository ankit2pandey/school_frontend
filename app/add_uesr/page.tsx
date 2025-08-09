"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    designation: "",
    school_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
      setFormData((prev) => ({ ...prev, school_id: storedId }));
    } else {
      console.warn("No userId found in localStorage");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { username, password, designation, school_id } = formData;
    if (!username || !password || !designation || !school_id) {
      setFeedback("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to register user");
      }

      setFeedback(data.message || "User registered successfully!");
      setFormData({
        username: "",
        password: "",
        designation: "",
        school_id: userId || "",
      });
    } catch (err: any) {
      console.error("Error adding user:", err);
      setFeedback(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Add Admin User
        </h2>

    {["username", "password", "designation"].map((field) => (
  <div key={field} className="flex flex-col space-y-1">
    <label
      htmlFor={field}
      className="text-sm font-medium text-gray-700"
    >
      {field === "username"
        ? "Email"
        : field.charAt(0).toUpperCase() + field.slice(1)}
    </label>
    <input
      type={
        field === "password"
          ? "password"
          : field === "username"
          ? "email"
          : "text"
      }
      name={field}
      id={field}
      value={formData[field as keyof typeof formData]}
      onChange={handleChange}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
      {...(field === "password" ? { minLength: 8 } : {})}
    />
    {field === "password" && formData.password.length > 0 && formData.password.length < 8 && (
      <p className="text-xs text-red-500 mt-1">Password must be at least 8 characters</p>
    )}
  </div>

        ))}

        <input type="hidden" name="school_id" value={formData.school_id} />

        {feedback && (
          <div
            className={`text-sm text-center ${
              feedback.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold transition-colors ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>

        {/* Go Back Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-800 font-medium underline transition"
          >
            ← Go Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}
