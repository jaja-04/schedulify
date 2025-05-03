import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { getSchedule, generateSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

// Get schedule - accessible by student, faculty, and admin
router.get('/', getSchedule);

// Generate schedule - admin only
router.post('/generate', generateSchedule);

export default router;
 