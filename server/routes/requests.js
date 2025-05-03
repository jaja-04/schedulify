import express from 'express';
import DayOffRequest from '../models/DayOffRequest.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure path is correct

const router = express.Router();

// =======================
// FACULTY: Submit a request
// =======================
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { selectedDate } = req.body;
    const userId = req.user.id; // Taken from token, not from client

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

// =======================
// FACULTY: View their own requests
// =======================
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await DayOffRequest.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your requests', details: error.message });
  }
});

// =======================
// ADMIN: View all requests
// =======================
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    const requests = await DayOffRequest.findAll({
      include: {
        model: User,
        as: 'requester',
        attributes: ['id', 'name', 'role']
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests', details: error.message });
  }
});

// =======================
// ADMIN: Approve or reject a request
// =======================
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

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
