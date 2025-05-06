

import Schedule from "../models/Schedule.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

export const getStudentSchedule = async (req, res) => {
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


// In controller
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{
        model: User,
        as: 'account', // must match alias
        attributes: ["name"] // only fields that exist in User table
      }],
      order: [["id", "ASC"]],
    });
    
    


    res.json({ success: true, data: students }); 
  } catch (err) {
    console.error("Error fetching all students:", err);
    res.status(500).json({ success: false, error: err.message }); // Show actual error
  }
};

