import { NextResponse } from "next/server";
import pool from "../db"

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM viewapplicants");
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
