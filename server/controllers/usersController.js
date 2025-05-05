// controllers/usersController.js
import User from '../models/User.js'

export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.findAll({ where: { role } });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

