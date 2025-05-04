const express = require("express");
const { getStudentSchedule } = require("../controllers/studentController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

// Only allow authenticated students
router.get("/schedule", verifyToken, requireRole("student"), getStudentSchedule);

module.exports = router;
