"use client";
import React, { useEffect, useState } from "react";
import WelcomePage from "./WelcomePage";
import Link from "next/link";

const DashboardPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [staffData, setStaffData] = useState<string[][]>([]);
  const [schoolDetails, setSchoolDetails] = useState<any>(null);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadingSchool, setLoadingSchool] = useState(true);

  // Load school_id from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    } else {
      console.warn("No userId found in localStorage");
    }
  }, []);

  // Fetch staff data
  useEffect(() => {
    if (!userId) return;

    const fetchStaff = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/admin/users/${userId}`);
        const data = await res.json();
        if (res.ok && data?.data) {
          const formatted = data.data.map((user: any) => [
            user.username,
            user.designation,
            "—", // Placeholder for department
          ]);
          setStaffData(formatted);
        } else {
          console.error("Failed to fetch staff:", data.message);
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaff();
  }, [userId]);

  // Fetch school details
  useEffect(() => {
    if (!userId) return;

    const fetchSchoolDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/school/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setSchoolDetails(data);
        } else {
          console.error("Failed to fetch school details:", data.message);
        }
      } catch (err) {
        console.error("Error fetching school details:", err);
      } finally {
        setLoadingSchool(false);
      }
    };

    fetchSchoolDetails();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomePage />

      <div className="px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* School Info */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <header className="mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
              {schoolDetails?.logoUrl && (
                <img src={schoolDetails.logoUrl} alt="School Logo" className="h-12 w-12 rounded-full object-cover" />
              )}
            </header>

            {loadingSchool ? (
              <p className="text-gray-500">Loading school details...</p>
            ) : schoolDetails ? (
              <div className="grid gap-6 md:grid-cols-3">
                <InfoCard label="School ID" value={schoolDetails.code || "—"} />
                <InfoCard label="School Name" value={schoolDetails.name || "—"} />
                <InfoCard label="Affiliation No." value={schoolDetails.affiliationNumber || "—"} />
                <InfoCard label="Board" value={schoolDetails.board || "—"} />
                <InfoCard label="Medium" value={schoolDetails.medium || "—"} />
                <InfoCard label="Type" value={schoolDetails.schoolType || "—"} />
                <InfoCard label="Established" value={schoolDetails.establishmentYear?.toString() || "—"} />
                <InfoCard label="Phone" value={schoolDetails.contactPhone || "—"} />
                <InfoCard label="Email" value={schoolDetails.contactEmail || "—"} />
                <InfoCard label="Website" value={schoolDetails.website || "—"} />
                <InfoCard
                  label="Address"
                  value={
                    schoolDetails.address
                      ? `${schoolDetails.address.street}, ${schoolDetails.address.city}, ${schoolDetails.address.state}, ${schoolDetails.address.country}`
                      : "—"
                  }
                />
              </div>
            ) : (
              <p className="text-red-500">School details not found.</p>
            )}
          </section>

          {/* Staff Management */}
          <SectionBlock title="👩‍🏫 Staff Management">
            {loadingStaff ? (
              <p className="text-gray-500">Loading staff data...</p>
            ) : staffData.length > 0 ? (
              <DataTable headers={["Name", "Role", "Department", "Actions"]} rows={staffData} />
            ) : (
              <p className="text-gray-500">No staff found for this school.</p>
            )}
            <Link href="/add_uesr">
              <ActionButton label="Add Admin User" />
            </Link>
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

          {/* Teacher Management */}
          <SectionBlock title="🎓 Teacher Management">
            <DataTable
              headers={["Name", "Grade", "Major", "Actions"]}
              rows={[
                ["Alice Thompson", "11", "Science"],
                ["Bob Williams", "12", "Mathematics"],
                ["Charlie Davis", "10", "History"],
              ]}
            />
            <Link href="/add_Teacher">
              <ActionButton label="Add Teacher" />
            </Link>
          </SectionBlock>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// Reusable Components
const SectionBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
    {children}
  </section>
);

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
);

const ActionButton = ({ label }: { label: string }) => (
  <div className="mt-4">
    <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition">
      {label}
    </button>
  </div>
);

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-teal-50 rounded-lg p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-teal-800 break-words">{value}</p>
  </div>
);
