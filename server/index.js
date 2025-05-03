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

// Main startup logic inside an async function
(async () => {
  try {
    // Associations
    User.hasMany(DayOffRequest, { foreignKey: 'userId', as: 'dayOffRequests' });
    DayOffRequest.belongsTo(User, { foreignKey: 'userId', as: 'requester' });

    User.hasOne(Student, { foreignKey: 'userId', as: 'studentProfile' });
    Student.belongsTo(User, { foreignKey: 'userId', as: 'account' });

    User.belongsToMany(Course, {
      through: 'FacultyCourse',
      foreignKey: 'facultyId',
      otherKey: 'courseId', // 👈 This is the key addition
      as: 'teachingCourses'
    });
    
    Course.belongsToMany(User, {
      through: 'FacultyCourse',
      foreignKey: 'courseId',
      otherKey: 'facultyId', // 👈 Mirror it here
      as: 'assignedFaculty'
    });
    

    // Force model recognition before syncing
    await sequelize.sync({ alter: true });

    // Seed data  
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

    console.log("Courses added or already exist.");

    // Start server only after DB is ready
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Startup Error:", err);
  }
})();
