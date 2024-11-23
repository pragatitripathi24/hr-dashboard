"use client"; // Ensure it's a Client Component

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

// Define the type for the application
type Application = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  contact: string;
  email: string;
  caddress: string;
  paddress: string;
  job_role: string;
  experience: number;
  ccompany: string;
  resume: string;
};

const JobApplicationsInbox = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job applications from the API
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/viewapplicants");
        if (response.ok) {
          const data = await response.json();
          setApplications(data.data);
        } else {
          console.error("Failed to fetch applications", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchApplications();
  }, []);
  

  if (loading) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Job Applications Inbox" />
        <div>Loading...</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Job Applications Inbox" />
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-semibold text-dark dark:text-white">Job Applications</h3>
        </div>
        <div className="p-6.5 overflow-x-auto">
          <table className="w-full border-collapse border border-stroke dark:border-dark-3 text-left">
            <thead className="bg-gray-100 dark:bg-dark-2">
              <tr>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">ID</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">First Name</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Middle Name</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Last Name</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Contact</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Email</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Current Address</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Permanent Address</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Job Role</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Experience</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Company</th>
                <th className="border border-stroke px-4 py-2 dark:border-dark-3">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="border border-stroke px-4 py-2">{application.id}</td>
                  <td className="border border-stroke px-4 py-2">{application.first_name}</td>
                  <td className="border border-stroke px-4 py-2">{application.middle_name}</td>
                  <td className="border border-stroke px-4 py-2">{application.last_name}</td>
                  <td className="border border-stroke px-4 py-2">{application.contact}</td>
                  <td className="border border-stroke px-4 py-2">{application.email}</td>
                  <td className="border border-stroke px-4 py-2">{application.caddress}</td>
                  <td className="border border-stroke px-4 py-2">{application.paddress}</td>
                  <td className="border border-stroke px-4 py-2">{application.job_role}</td>
                  <td className="border border-stroke px-4 py-2">{application.experience}</td>
                  <td className="border border-stroke px-4 py-2">{application.ccompany}</td>
                  <td className="border border-stroke px-4 py-2">{application.resume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default JobApplicationsInbox;
