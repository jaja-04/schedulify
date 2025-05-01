import express from 'express';
import { getSchedule, generateSchedule } from '../controllers/scheduleController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', authMiddleware, getSchedule); // for student/faculty
router.post('/generate', authMiddleware, generateSchedule); // for admin

export default router;
