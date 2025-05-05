// server/controllers/scheduleController.js
import db from '../db/db.js';
const Schedule = require("../models/Schedule");
const Student = require("../models/Student");
const User = require("../models/User");

export const getSchedule = async (req, res) => {
    const { role, id } = req.user;
  
    try {
      let query;
      let params;
  
      if (role === 'student') {
        // Find section of the student
        const [studentRows] = await db.execute('SELECT section FROM student WHERE userId = ?', [id]);
        if (!studentRows.length) return res.status(404).json({ error: 'Student not found' });
  
        const section = studentRows[0].section;
        [query, params] = ['SELECT * FROM schedules WHERE section = ?', [section]];
  
      } else if (role === 'faculty') {
        [query, params] = ['SELECT * FROM schedules WHERE professorId = ?', [id]];
  
      } else if (role === 'admin') {
        [query, params] = ['SELECT * FROM schedules', []];
  
      } else {
        return res.status(403).json({ error: 'Unauthorized role' });
      }
  
      const [schedules] = await db.execute(query, params);
      return res.status(200).json({ success: true, schedules });
  
    } catch (err) {
      console.error('Get Schedule Error:', err);
      return res.status(500).json({ error: err.message });
    }
  };
  

export const generateSchedule = async (req, res) => {
  try {
    // Load data from DB: students, faculty, subjects, rooms
    // Apply logic (rules, conflicts, etc)
    // Save result to `schedules` table

    res.status(200).json({ message: 'Schedule generated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScheduleByProfessor = async (req, res) => {
  const { professorId } = req.params;
  try {
    const schedule = await Schedule.find({ professor: professorId })
      .populate('subject classroom section');
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get professor schedule' });
  }
};

// For student schedule (based on their section)
exports.getScheduleByStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    const schedule = await Schedule.find({ section: student.section })
      .populate('subject classroom professor');
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get student schedule' });
  }
};
    



exports.getAllStudentSchedules = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{ model: User, attributes: ["fullName", "email"] }],
    });

    const allSchedules = [];

    for (const student of students) {
      const schedule = await Schedule.findAll({
        where: { section: student.section },
        include: ["subject", "faculty", "room"],
        order: [["day", "ASC"], ["startTime", "ASC"]],
      });

      allSchedules.push({
        student: {
          id: student.id,
          name: student.User?.fullName,
          email: student.User?.email,
          section: student.section,
        },
        schedule,
      });
    }

    res.json({ success: true, data: allSchedules });
  } catch (err) {
    console.error("Error fetching all student schedules:", err);
    res.status(500).json({ success: false, error: "Server error while fetching all schedules." });
  }
};
