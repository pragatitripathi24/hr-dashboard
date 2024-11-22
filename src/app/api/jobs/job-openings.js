//api/jobs/job-openings.js

import { db } from "@/utils/db"; // Adjust according to your database configuration

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const jobOpenings = await db("job_openings").select("*"); // Replace "job_openings" with your actual table name
      res.status(200).json({ success: true, data: jobOpenings });
    } catch (error) {
      console.error("Error fetching job openings:", error);
      res.status(500).json({ success: false, message: "Failed to fetch job openings" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
