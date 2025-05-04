import express from 'express';
import FacultyCourse from '../models/FacultyCourse.js';

const router = express.Router();

// Assign a faculty to a course
router.post('/assign', async (req, res) => {
  const { facultyId, courseId } = req.body;

  if (!facultyId || !courseId) {
    return res.status(400).json({ error: 'Missing facultyId or courseId' });
  }

  try {
    const [assignment, created] = await FacultyCourse.findOrCreate({
      where: { facultyId, courseId },
    });

    if (!created) {
      return res.status(409).json({ message: 'Faculty already assigned to this course' });
    }

    res.status(200).json({ message: 'Faculty assigned successfully', assignment });
  } catch (err) {
    res.status(500).json({ error: 'Assignment failed', details: err.message });
  }
});

export default router;
