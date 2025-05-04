const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const auth = require('../middleware/authMiddleware');

router.get('/all', auth, scheduleController.getAllSchedules);
router.get('/professor/:professorId', auth, scheduleController.getScheduleByProfessor);
router.get('/student/:studentId', auth, scheduleController.getScheduleByStudent);


module.exports = router;
