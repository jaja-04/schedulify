import express from 'express';
import DayOffRequest from '../models/DayOffRequest.js';
import User from '../models/User.js';

const router = express.Router();

// POST: Submit a day-off request
router.post('/', async (req, res) => {
  try {
    const { selectedDate, userId } = req.body;

    const newRequest = await DayOffRequest.create({
      selectedDate,
      userId,
      status: 'pending'
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit request', details: error.message });
  }
});

// GET: View all requests (admin or faculty)
router.get('/', async (req, res) => {
  try {
    const requests = await DayOffRequest.findAll({
      include: {
        model: User,
        as: 'requester', // use correct alias if you changed it
        attributes: ['id', 'name', 'role']
      }
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests', details: error.message });
  }
});

// GET: View own requests (based on userId passed as query)
router.get('/mine', async (req, res) => {
  try {
    const { userId } = req.query;

    const requests = await DayOffRequest.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your requests', details: error.message });
  }
});

// PATCH: Update status (admin approves or rejects)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await DayOffRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request', details: error.message });
  }
});

export default router;
