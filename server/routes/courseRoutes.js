// routes/courseRoutes.js
import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Schedule from '../models/Schedule.js';

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

// PATCH - Assign instructor to a course
router.patch('/:courseId/assign-instructor', async (req, res) => {
  const { courseId } = req.params;
  const { facultyId } = req.body;

  try {
    // Validate that faculty exists and has faculty role
    if (facultyId) {
      const faculty = await User.findByPk(facultyId);
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty user not found' });
      }
      if (faculty.role !== 'faculty') {
        return res.status(400).json({ message: 'User is not a faculty member' });
      }
    }

    // Update the course with the new faculty ID
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update the course's facultyId
    await course.update({ facultyId: facultyId || null });

    // Additionally, update any schedules for this course with the new faculty
    await Schedule.update(
      { facultyId: facultyId || null },
      { where: { courseId } }
    );

    res.status(200).json({ 
      message: 'Instructor assigned successfully',
      course: await Course.findByPk(courseId)
    });
  } catch (err) {
    console.error('Error assigning instructor:', err);
    res.status(500).json({ 
      message: 'Failed to assign instructor', 
      details: err.message 
    });
  }
});

// In your courseRoutes.js - existing code for updating multiple instructors
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

// GET /courses/summary - Fetch all courses with only courseName and units
router.get('/summary', async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ['courseName', 'units']
    });

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch course summaries', details: err.message });
  }
});



export default router;