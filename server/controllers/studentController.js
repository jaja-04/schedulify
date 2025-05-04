const Schedule = require("../models/Schedule");
const Student = require("../models/Student");
const User = require("../models/User");

exports.getStudentSchedule = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { userId: req.user.id } });

    if (!student) {
      return res.status(404).json({ success: false, error: "Student profile not found." });
    }

    const schedule = await Schedule.findAll({
      where: { section: student.section },
      include: ["subject", "faculty", "room"],
      order: [["day", "ASC"], ["startTime", "ASC"]],
    });

    res.json({ success: true, data: schedule });
  } catch (err) {
    console.error("Schedule fetch error:", err);
    res.status(500).json({ success: false, error: "Server error while fetching schedule." });
  }
};
