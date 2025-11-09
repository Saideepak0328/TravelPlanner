import { Router } from "express";
import { pool } from "../db/index.js";
import jwt from "jsonwebtoken";

const router = Router();

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.post("/", auth, async (req, res) => {
  try {
    const { destination, start_date, end_date, budget, notes } = req.body;
    const [result] = await pool.query(
      "INSERT INTO travel_details (user_id, destination, start_date, end_date, budget, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [req.user.id, destination, start_date || null, end_date || null, budget || null, notes || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) {
    console.error("[/api/travel POST] ERROR:", e);
    res.status(500).json({ message: "Server error", code: e.code, detail: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM travel_details WHERE user_id=? ORDER BY created_at DESC", [req.user.id]);
    res.json(rows);
  } catch (e) {
    console.error("[/api/travel GET] ERROR:", e);
    res.status(500).json({ message: "Server error", code: e.code, detail: e.message });
  }
});

export default router;
