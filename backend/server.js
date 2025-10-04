const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/api/sleep-entries", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sleep_entries ORDER BY start_time DESC"
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/sleep-entries", async (req, res) => {
  const { start_time, end_time, type, note } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO sleep_entries (start_time, end_time, type, note) VALUES (?, ?, ?, ?)",
      [start_time, end_time, type, note]
    );
    res.json({
      success: true,
      data: { id: result.insertId, start_time, end_time, type, note },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Example route to test DB connection
app.get("/api/test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS test");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
