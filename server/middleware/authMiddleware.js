import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);  // Log the Authorization header

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("Token missing or invalid format");
      return res.status(401).json({ success: false, error: 'Token not provided or invalid format' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);  // Decode the token

    console.log("Decoded JWT:", decoded);  // Log the decoded token

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      console.log("User not found for ID:", decoded.id);
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user;  // Attach user to the request
    next();  
  } catch (error) {
    console.error('verifyUser error:', error);  // Log error if something goes wrong
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export default verifyUser;
