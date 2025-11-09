import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
console.log("ENV LOADED:", process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});
pool.getConnection()
  .then((c)=>{ console.log("✅ MySQL connected successfully!"); c.release(); })
  .catch((err)=>{ console.error("❌ MySQL connection FAILED:", err.code, err.message); });
