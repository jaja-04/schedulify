import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import scheduleRouter from "./routes/schedule.js";
import requestsRouter from "./routes/requests.js";
import Student from "./models/Student.js";
import User from "./models/User.js";
import DayOffRequest from "./models/DayOffRequest.js";  // Import DayOffRequest model
import sequelize from "./db/db.js";


dotenv.config(); 

// Associations
User.hasMany(DayOffRequest, { foreignKey: 'userId', as: 'dayOffRequests' });
DayOffRequest.belongsTo(User, { foreignKey: 'userId', as: 'requester' });

User.hasOne(Student, { foreignKey: 'userId', as: 'studentProfile' });
Student.belongsTo(User, { foreignKey: 'userId', as: 'account' });

// Connect to MySQL database and sync models
sequelize.sync({ alter: true}) 
  .then(() => console.log("MySQL Database Synced"))
  .catch((err) => console.error("MySQL Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Change this as needed
  credentials: true, // Allow credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow the 'Authorization' header
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



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
