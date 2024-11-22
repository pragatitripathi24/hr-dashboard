// /pages/api/viewapplicants.js
import { db } from "@/utils/db"; // Adjust according to your database configuration

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const applicants = await db("viewapplicants").select("*"); // Fetch all columns from the table
      res.status(200).json({ success: true, data: applicants });
    } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ success: false, message: "Failed to fetch applicants" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
