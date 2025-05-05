import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import scheduleRouter from "./routes/schedule.js";
import requestsRouter from "./routes/requests.js";
import Student from "./models/Student.js";
import User from "./models/User.js";
import DayOffRequest from "./models/DayOffRequest.js";
import sequelize from "./db/db.js";
import Course from "./models/Course.js";
import FacultyCourse from "./models/FacultyCourse.js";
import Schedule from './models/Schedule.js';
import Room from './models/Room.js';
import scheduleRoutes from './routes/schedule.js';
import courseRoutes from './routes/courseRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/requests", requestsRouter);
app.use('/api/schedule', scheduleRoutes);
app.use("/api/courses", courseRoutes);


// Main startup logic inside an async function
(async () => {
  try {
    // Associations
    User.hasMany(DayOffRequest, { foreignKey: 'userId', as: 'dayOffRequests' });
    DayOffRequest.belongsTo(User, { foreignKey: 'userId', as: 'requester' });

    User.hasOne(Student, { foreignKey: 'userId', as: 'studentProfile' });
    Student.belongsTo(User, { foreignKey: 'userId', as: 'account' });

    User.belongsToMany(Course, {
      through: FacultyCourse,
      foreignKey: 'facultyId',
      otherKey: 'courseId',
      as: 'teachingCourses',
    });

    Course.belongsToMany(User, {
      through: FacultyCourse,
      foreignKey: 'courseId',
      otherKey: 'facultyId',
      as: 'assignedFaculty',
    });

    // Sync DB
    await sequelize.sync({ alter: true });

    const roomData = [
      { name: 'CICS 201' },
      { name: 'CICS 202' },
      { name: 'CICS 501' },
      { name: 'CICS 502' },
      { name: 'Cpe Lab' },
      { name: 'Comp Lab 1' },
    ];
    
    for (const room of roomData) {
      await Room.findOrCreate({
        where: { name: room.name },
        defaults: room,
      });
    }
    
    console.log('Rooms added or already exist.');

    // Seed Courses
    const courseData = [
      { courseId: "CpEE 402", courseName: "Cognate / Elective Course 2", units: 3 },
      { courseId: "CpE 420", courseName: "Digital Signal Processing", units: 4 },
      { courseId: "CpE 422", courseName: "CpE Practice and Design 1", units: 1 },
      { courseId: "CpE 417", courseName: "Microprocessors", units: 4 },
      { courseId: "CpE 421", courseName: "Emerging Technologies in CpE", units: 3 },
      { courseId: "CpE 419", courseName: "Routing and Switching (Cisco 2)", units: 1 },
      { courseId: "CpE 418", courseName: "Software Design", units: 4 },
    ];

    for (const course of courseData) {
      await Course.findOrCreate({
        where: { courseId: course.courseId },
        defaults: course
      });
    }

    // Seed Faculty Users
    const facultyList = [
      { name: "Juan Karlos", email: "juankarlos@g.batstate-u.edu.ph" },
      { name: "Maria Santos", email: "mariasantos@g.batstate-u.edu.ph" },
      { name: "Pedro Cruz", email: "pedrocruz@g.batstate-u.edu.ph" },
      { name: "Ana Garcia", email: "anagarcia@g.batstate-u.edu.ph" },
      { name: "Jose Reyes", email: "josereyes@g.batstate-u.edu.ph" },
      { name: "Teresa Lim", email: "teresalim@g.batstate-u.edu.ph" },
      { name: "Roberto Manuel", email: "robertomanuel@g.batstate-u.edu.ph" },
      { name: "Victoria Aquino", email: "victoriaaquino@g.batstate-u.edu.ph" },
      { name: "Eduardo Torres", email: "eduardotorres@g.batstate-u.edu.ph" },
      { name: "Carmen Dalisay", email: "carmendalisay@g.batstate-u.edu.ph" },
      { name: "Antonio Bueno", email: "antoniobueno@g.batstate-u.edu.ph" },
      { name: "Isabella Cruz", email: "isabellacruz@g.batstate-u.edu.ph" },
      { name: "Francisco Diaz", email: "franciscodiaz@g.batstate-u.edu.ph" },
      { name: "Rosario Esperanza", email: "rosarioesperanza@g.batstate-u.edu.ph" },
    ];

    const facultyUsers = [];

    for (const faculty of facultyList) {
      const [user] = await User.findOrCreate({
        where: { email: faculty.email },
        defaults: {
          name: faculty.name,
          email: faculty.email,
          password: "defaultpassword", // hash this in production
          role: "faculty",
        },
      });
      facultyUsers.push(user);
    }

    // Assign 2 faculty per course
    const courseAssignments = [
      ["CpEE 402", [0, 1]],
      ["CpE 420", [2, 3]],
      ["CpE 422", [4, 5]],
      ["CpE 417", [6, 7]],
      ["CpE 421", [8, 9]],
      ["CpE 419", [10, 11]],
      ["CpE 418", [12, 13]],
    ];

    for (const [courseId, facultyIndexes] of courseAssignments) {
      for (const index of facultyIndexes) {
        await FacultyCourse.findOrCreate({
          where: {
            facultyId: facultyUsers[index].id,
            courseId: courseId,
          },
        });
      }
    }

    console.log("Courses and faculty assignments seeded.");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Startup Error:", err);
  }
})();

