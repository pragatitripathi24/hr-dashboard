import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost", // Replace with your DB host
  user: "root", // Replace with your DB username
  password: "prag24", // Replace with your DB password
  database: "genicminds_hrdashboard", // Replace with your DB name
});

export default pool;
