import { Router } from "express";
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    const [existing] = await pool.query("SELECT id FROM users WHERE email=?", [email]);
    if (existing.length) return res.status(409).json({ message: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hash]
    );
    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: result.insertId, name, email } });
  } catch (e) {
    console.error("[/api/auth/signup] ERROR:", e);
    res.status(500).json({ message: "Server error", code: e.code, detail: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const [rows] = await pool.query("SELECT id, name, email, password_hash FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(401).json({ message: "Invalid credentials" });
    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: u.id, email: u.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: u.id, name: u.name, email: u.email } });
  } catch (e) {
    console.error("[/api/auth/login] ERROR:", e);
    res.status(500).json({ message: "Server error", code: e.code, detail: e.message });
  }
});

export default router;
