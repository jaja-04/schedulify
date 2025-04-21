// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from './config/mysql.js';
import connectCloudinary from './config/cloudinary.js';
import facultyRoutes from './models/facultyModels.js';
import studentRoutes from './models/studentModels.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MySQL
connectDB();

// Connect to Cloudinary (if you're using it)
connectCloudinary();

// Base route
app.get('/', (req, res) => {
  res.send('API WORKING GWEN');
});

// Faculty Login Route
app.post('/api/faculty/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Faculty login attempt for:', email);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if faculty exists in MySQL database
    const [faculty] = await global.pool.execute(
      'SELECT * FROM faculty WHERE email = ?',
      [email]
    );

    if (faculty.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, faculty[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: faculty[0].id, email: faculty[0].email, role: 'faculty' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      faculty: {
        id: faculty[0].id,
        firstName: faculty[0].firstName,
        lastName: faculty[0].lastName,
        email: faculty[0].email
      }
    });
  } catch (error) {
    console.error('Error during faculty login:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Faculty SignUp Route
app.post('/api/faculty/signup', async (req, res) => {
  const { lastName, firstName, middleName, email, employeeCode, school, department, program, password } = req.body;
  console.log('Faculty signup attempt for:', email);

  if (!lastName || !firstName || !email || !password || !employeeCode || !school || !department || !program) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    // Check if email already exists in MySQL
    const [existingFaculty] = await global.pool.execute(
      'SELECT * FROM faculty WHERE email = ?',
      [email]
    );

    if (existingFaculty.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new faculty into MySQL
    const [result] = await global.pool.execute(
      `INSERT INTO faculty (lastName, firstName, middleName, email, employeeCode, school, department, program, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lastName,
        firstName,
        middleName || null,
        email,
        employeeCode,
        school,
        department,
        program,
        hashedPassword
      ]
    );

    return res.status(201).json({ 
      message: 'Registration successful!',
      facultyId: result.insertId
    });
  } catch (error) {
    console.error('Error during faculty signup:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Student Login Route
app.post('/api/student/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Student login attempt for:', email);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if student exists in MySQL database
    const [students] = await global.pool.execute(
      'SELECT * FROM students WHERE email = ?',
      [email]
    );

    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, students[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: students[0].id, email: students[0].email, role: 'student' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      student: {
        id: students[0].id,
        firstName: students[0].firstName,
        lastName: students[0].lastName,
        email: students[0].email,
        srCode: students[0].srCode
      }
    });
  } catch (error) {
    console.error('Error during student login:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Student SignUp Route
app.post('/api/student/signup', async (req, res) => {
  const { lastName, firstName, middleName, email, srCode, school, yearandSection, password } = req.body;
  console.log('Student signup attempt for:', email);

  if (!lastName || !firstName || !email || !srCode || !school || !yearandSection || !password) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    // Check if email already exists in MySQL
    const [existingStudent] = await global.pool.execute(
      'SELECT * FROM students WHERE email = ?',
      [email]
    );

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new student into MySQL
    const [result] = await global.pool.execute(
      `INSERT INTO students (lastName, firstName, middleName, email, srCode, school, yearandSection, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lastName,
        firstName,
        middleName || null,
        email,
        srCode,
        school,
        yearandSection,
        hashedPassword
      ]
    );

    return res.status(201).json({ 
      message: 'Registration successful!',
      studentId: result.insertId
    });
  } catch (error) {
    console.error('Error during student signup:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Use routers for more specific routes
app.use('/faculty', facultyRoutes);
app.use('/student', studentRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`);
});