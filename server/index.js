require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


/* =======================
   HEALTH CHECK
======================= */
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

/* =======================
   START ADMISSION
======================= */
app.post("/api/admission/start", async (req, res) => {
  try {
    const { applicant_name } = req.body;
    if (!applicant_name) {
      return res.status(400).json({ error: "Applicant name required" });
    }

    const [result] = await pool.query(
      "INSERT INTO admissions (applicant_name) VALUES (?)",
      [applicant_name.trim()]
    );

    res.json({
      ok: true,
      admission_id: result.insertId
    });
  } catch (err) {
    console.error("START ERR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   ADD ADMISSION DATA
======================= */
app.post("/api/admission", async (req, res) => {
  try {
    const { admission_id, section, value } = req.body;

    if (!admission_id || !section || !value) {
      return res
        .status(400)
        .json({ error: "admission_id, section, value required" });
    }

    const [result] = await pool.query(
      "INSERT INTO admission_details (admission_id, section, attribute) VALUES (?, ?, ?)",
      [admission_id, section, value.trim()]
    );

    res.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("ADD ERR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   FETCH DATA BY SECTION
======================= */
app.get("/api/admission/:admissionId/:section", async (req, res) => {
  try {
    const { admissionId, section } = req.params;

    const [rows] = await pool.query(
      "SELECT id, attribute AS value FROM admission_details WHERE admission_id=? AND section=? ORDER BY id DESC",
      [admissionId, section]
    );

    res.json(rows);
  } catch (err) {
    console.error("GET ERR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   UPDATE DATA
======================= */
app.put("/api/admission/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ error: "Value required" });
    }

    await pool.query(
      "UPDATE admission_details SET attribute=? WHERE id=?",
      [value.trim(), id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("UPDATE ERR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   DELETE DATA
======================= */
app.delete("/api/admission/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM admission_details WHERE id=?",
      [id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE ERR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   SERVER START
======================= */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
