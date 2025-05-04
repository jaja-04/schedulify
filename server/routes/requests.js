import express from 'express';
import DayOffRequest from '../models/DayOffRequest.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ===============
// POST: Create new request (Faculty)
// ===============
router.post('/', authMiddleware, async (req, res) => {

  try {
    const { selectedDate } = req.body;
    const userId = req.user.id;

    if (!selectedDate) {
      return res.status(400).json({ error: 'selectedDate is required' });
    }

    const newRequest = await DayOffRequest.create({
      selectedDate,
      userId,
      status: 'pending',
    });

    console.log("New request saved:", newRequest.toJSON());

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit request', details: error.message });
  }
});

// ===============
// GET: Faculty - View their own requests

// Route to fetch day-off requests for the authenticated user
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // This will be set by the verifyUser middleware

    const requests = await DayOffRequest.findAll({
      where: { userId },
      include: {
        model: User,
        as: 'userRequester', // Change the alias here to match the one used in the model
        attributes: ['name'],  // Include the 'name' field of the user
      },
      order: [['createdAt', 'DESC']],
    });

    res.json(requests);  // Return the requests with the user's name included
  } catch (error) {
    console.error("Failed to fetch day-off requests:", error);
    res.status(500).json({ error: 'Failed to fetch your requests', details: error.message });
  }
});





// ===============
// GET: Admin - View all requests
// ===============
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    const requests = await DayOffRequest.findAll({
      include: {
        model: User,
        as: 'requester',
        attributes: ['id', 'name', 'role'],
      },
      order: [['createdAt', 'DESC']],
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests', details: error.message });
  }
});

// ===============
// PATCH: Admin - Update request status
// ===============
// PATCH: Admin - Update request status
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
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request', details: error.message });
  }
});


router.get('/test', (req, res) => {
  console.log("Test route hit");
  res.json({ message: "Backend is alive" });
});


export default router;
