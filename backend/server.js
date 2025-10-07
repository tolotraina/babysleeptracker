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

app.get("/api/sleep-entries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sleep_entries WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Entry not found" });
    }
    res.json({ success: true, data: rows[0] });
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

app.post("/api/sleep-entries/:id", async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, type, note } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE sleep_entries SET start_time = ?, end_time = ?, type = ?, note = ? WHERE id = ?",
      [start_time, end_time, type, note, id]
    );

    res.json({
      success: true,
      data: { id, start_time, end_time, type, note },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/sleep-entries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM sleep_entries WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Entry not found" });
    }
    res.json({ success: true });
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
