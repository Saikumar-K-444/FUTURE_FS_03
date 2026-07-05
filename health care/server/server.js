const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// =======================
// MySQL Connection Pool
// =======================
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Saikondri@2007", 
  database: "smartcare_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// =======================
// Database Connection Check
// =======================
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
    connection.release();
  }
});

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
  res.json({
    project: "Smart Health Care",
    message: "Backend Server Running Successfully 🚀"
  });
});

// =======================
// GET All Diseases
// =======================
app.get("/api/diseases", (req, res) => {

  const sql = "SELECT * FROM diseases ORDER BY id ASC";

  pool.query(sql, (err, results) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error"
      });
    }

    res.status(200).json({
      success: true,
      total: results.length,
      data: results
    });

  });

});

// =======================
// 404 Route
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found"
  });
});

// =======================
// Start Server
// =======================
const PORT = 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🏥 Smart Health Care Server");
  console.log("=================================");
  console.log(`🚀 Server Running : http://localhost:${PORT}`);
  console.log(`📂 API Endpoint   : http://localhost:${PORT}/api/diseases`);
  console.log("=================================");
});