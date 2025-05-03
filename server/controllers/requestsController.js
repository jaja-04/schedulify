import DayOffRequest from '../models/DayOffRequest.js';
import User from '../models/User.js';

// Faculty: Submit a new day-off request
export const addRequest = async (req, res) => {
  try {
    const { selectedDate } = req.body;
    const userId = req.user.id; // From authMiddleware

    const request = await DayOffRequest.create({ selectedDate, userId });
    res.status(201).json({ message: 'Request submitted successfully', request });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting request', error: error.message });
  }
};

// Faculty: View own requests
export const getMyRequests = async (req, res) => {
  try {
    const requests = await DayOffRequest.findAll({
      where: { userId: req.user.id },
      include: { model: User, as: 'requester', attributes: ['name', 'email'] }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your requests', error: error.message });
  }
};

// Admin: View all requests
export const getAllRequests = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const requests = await DayOffRequest.findAll({
      include: { model: User, as: 'requester', attributes: ['name', 'email'] }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all requests', error: error.message });
  }
};

// Admin: Approve or reject a request
export const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const { id } = req.params;
    const { status } = req.body; // expected: 'accepted' or 'rejected'

    const request = await DayOffRequest.findByPk(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}`, request });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request status', error: error.message });
  }
};
