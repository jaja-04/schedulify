// routes/users.js
import express from 'express';
import { getUsersByRole } from '../controllers/usersController.js';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

router.get('/role/:role', getUsersByRole); // /api/users/role/faculty

// GET user by email
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;