//api/jobs/route.js

import { createConnection } from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "prag24",
  database: "genicminds_hrdashboard",
};
export async function DELETE(req) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      console.log("Job ID received for deletion:", id);
      if (!id) {
        return new Response(JSON.stringify({ error: "Job ID is required" }), { status: 400 });
      }
  
      const connection = await createConnection(dbConfig);
      const [result] = await connection.query("DELETE FROM add_jobs WHERE id = ?", [id]);
      console.log("Delete result:", result);
      await connection.end();
  
      return new Response(JSON.stringify({ message: "Job deleted successfully" }), { status: 200 });
    } catch (error) {
      console.error("Database error during delete:", error);
      return new Response(JSON.stringify({ error: "Database error", details: error.message }), { status: 500 });
    }
  }
  
  
  export async function PUT(req) {
    try {
      const body = await req.json();
      const { id, jobName, location, experience, jobType, keySkills } = body;
  
      if (!id || !jobName || !location || !experience || !jobType || !keySkills) {
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
      }
  
      const connection = await createConnection(dbConfig);
      const query = `
        UPDATE add_jobs 
        SET jobname = ?, location = ?, experience = ?, type = ?, skills = ? 
        WHERE id = ?
      `;
      await connection.execute(query, [jobName, location, experience, jobType, keySkills, id]);
      await connection.end();
  
      return new Response(JSON.stringify({ message: "Job updated successfully" }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Database error", details: error.message }), { status: 500 });
    }
  }
  
export async function GET(req) {
  try {
    const connection = await createConnection(dbConfig);
    const [rows] = await connection.query("SELECT * FROM add_jobs");
    await connection.end();

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error", details: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { jobName, location, experience, jobType, keySkills } = body;

    if (!jobName || !location || !experience || !jobType || !keySkills) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const connection = await createConnection(dbConfig);
    const query = `
      INSERT INTO add_jobs (jobname, location, experience, type, skills)
      VALUES (?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [jobName, location, experience, jobType, keySkills]);
    await connection.end();

    return new Response(JSON.stringify({ message: "Job added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error", details: error.message }), { status: 500 });
  }
}
