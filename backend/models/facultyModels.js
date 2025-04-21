// models/facultyModels.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// This route will be accessible at /faculty/profile
router.get('/profile', async (req, res) => {
  try {
    // Get authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'admin@1234');
    
    // Get faculty data from database
    const [faculty] = await global.pool.execute(
      'SELECT id, firstName, lastName, middleName, email, employeeCode, school, department, program FROM faculty WHERE id = ?',
      [decoded.id]
    );
    
    if (faculty.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Faculty not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      faculty: faculty[0]
    });
    
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching profile', 
      error: error.message 
    });
  }
});

// This can remain empty if you're handling login/signup in server.js
// You can add more faculty-specific routes here later

export default router;