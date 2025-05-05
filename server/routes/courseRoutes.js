// routes/courseRoutes.js
import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
});

// In your courseRoutes.js
router.patch('/:courseId/update-instructors', async (req, res) => {
  const { courseId } = req.params;
  const { facultyIds } = req.body;

  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.setInstructors(facultyIds); // if using a many-to-many relation
    res.json({ message: 'Instructors updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating instructors' });
  }
});



export default router;
