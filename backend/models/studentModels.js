// models/studentModels.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get student profile
router.get('/profile', async (req, res) => {
  try {
    // Get authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success : false, 
        message : 'No token provided' 
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get student data from database
    const [students] = await global.pool.execute(
      `SELECT 
         id, 
         firstName, 
         lastName, 
         middleName, 
         email, 
         srCode, 
         school, 
         yearandSection 
       FROM students 
       WHERE id = ?`,
      [decoded.id]
    );
    
    if (students.length === 0) {
      return res.status(404).json({ 
        success : false, 
        message : 'Student not found' 
      });
    }
    
    res.status(200).json({
      success : true,
      student : students[0]
    });
    
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      success : false, 
      message : 'Error fetching profile', 
      error   : error.message 
    });
  }
});

// You can add more student-specific routes here later

export default router;
