import express from 'express';
import { getAllStudents, getStudentSchedule } from '../controllers/studentController.js';


const router = express.Router();

// Student-specific routes (accessible only by students)
router.get("/schedule", getStudentSchedule);

// Admin-specific routes (accessible only by admins)
router.get("/all", getAllStudents);

export default router;