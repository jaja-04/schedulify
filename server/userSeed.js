import { sequelize, connectToDatabase } from './db/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const userRegister = async () => {
  await connectToDatabase();

  try {
    const hashPassword1 = await bcrypt.hash("faculty", 10);
    await User.create({
      name: "faculty",
      email: "faculty@gmail.com",
      password: hashPassword1,
      role: "faculty",
    });
    console.log("faculty user created successfully.");

    const hashPassword2 = await bcrypt.hash("student", 10);
    await User.create({
      name: "student",
      email: "student@gmail.com",
      password: hashPassword2,
      role: "student",
    });
    console.log("student user created successfully.");

    const hashPassword3 = await bcrypt.hash("admin", 10);
    await User.create({
      name: "admin",
      email: "admin@gmail.com",
      password: hashPassword3,
      role: "admin",
    });
    console.log("admin user created successfully.");
  } catch (error) {
    console.error("Error inserting users:", error);
  } finally {
    await sequelize.close(); 
  }
};

userRegister();