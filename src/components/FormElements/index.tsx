"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// Define JobOpening interface
interface JobOpening {
  id: number; // Ensure 'id' is defined
  jobName: string;
  location: string;
  experience: string;
  jobType: string;
  keySkills: string;
}

const JobOpeningForm = () => {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [form, setForm] = useState<Omit<JobOpening, "id">>({
    jobName: "",
    location: "",
    experience: "",
    jobType: "",
    keySkills: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch all jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobOpenings(
        data.map((job: any) => ({
          id: job.id, // Include the 'id' field
          jobName: job.jobname,
          location: job.location,
          experience: job.experience,
          jobType: job.type,
          keySkills: job.skills,
        }))
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

 
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle edit
  const handleEdit = (index: number) => {
    const { id, ...rest } = jobOpenings[index];
    setForm(rest); // Exclude 'id' from the form
    setEditingIndex(index);
  };

  const handleDelete = async (index: number) => {
    const job = jobOpenings[index];
    try {
      console.log("Attempting to delete job with ID:", job.id);
      const response = await fetch(`/api/jobs?id=${job.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");
      console.log("Job deleted successfully");
      fetchJobs(); // Refresh list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      const method = editingIndex !== null ? "PUT" : "POST";
      const payload = editingIndex !== null
        ? { ...form, id: jobOpenings[editingIndex].id }
        : form;
  
      console.log("Submitting payload:", payload);
  
      const response = await fetch("/api/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Failed to save job");
      console.log("Job saved successfully");
      fetchJobs(); // Refresh list
      setForm({ jobName: "", location: "", experience: "", jobType: "", keySkills: "" });
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };
  

  return (
    <>
      <Breadcrumb pageName="Job Openings" />
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold">Add Job Opening</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Job Opening Name</label>
            <input
              type="text"
              name="jobName"
              value={form.jobName}
              onChange={handleChange}
              placeholder="Enter job opening name"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Experience Required</label>
            <input
              type="text"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Enter experience (e.g., 2+ years)"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Job Type</label>
            <input
              type="text"
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              placeholder="Enter job type (e.g., Full-time, Part-time)"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Key Skills Needed</label>
            <input
              type="text"
              name="keySkills"
              value={form.keySkills}
              onChange={handleChange}
              placeholder="Enter key skills (e.g., React, Node.js)"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
          >
            {editingIndex !== null ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-bold">Job Openings</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Job Name</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Experience</th>
              <th className="border border-gray-300 px-4 py-2">Job Type</th>
              <th className="border border-gray-300 px-4 py-2">Key Skills</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobOpenings.map((job, index) => (
              <tr key={job.id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{job.jobName}</td>
                <td className="border border-gray-300 px-4 py-2">{job.location}</td>
                <td className="border border-gray-300 px-4 py-2">{job.experience}</td>
                <td className="border border-gray-300 px-4 py-2">{job.jobType}</td>
                <td className="border border-gray-300 px-4 py-2">{job.keySkills}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 text-white bg-yellow-500 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 text-white bg-red-600 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JobOpeningForm;
