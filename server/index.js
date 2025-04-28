import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import Student from "./models/Student.js";
import User from "./models/User.js";
import sequelize from "./db/db.js";

dotenv.config(); 

sequelize.sync({ alter: true }) 
  .then(() => console.log("MySQL Database Synced"))
  .catch((err) => console.error("MySQL Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);




app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});