import { sequelize, connectToDatabase } from './db/db.js';
import User from './models/User.js';
import Student from './models/Student.js';  // Import the Student model
import bcrypt from 'bcryptjs';

// const facultyEmails = [
//   "juankarlos@g.batstate-u.edu.ph", "mariasantos@g.batstate-u.edu.ph", "pedrocruz@g.batstate-u.edu.ph",
//   "anagarcia@g.batstate-u.edu.ph", "josereyes@g.batstate-u.edu.ph", "teresalim@g.batstate-u.edu.ph",
//   "robertomanuel@g.batstate-u.edu.ph", "victoriaaquino@g.batstate-u.edu.ph", "eduardotorres@g.batstate-u.edu.ph",
//   "carmendalisay@g.batstate-u.edu.ph", "antoniobueno@g.batstate-u.edu.ph", "isabellacruz@g.batstate-u.edu.ph",
//   "franciscodiaz@g.batstate-u.edu.ph", "rosarioesperanza@g.batstate-u.edu.ph"
// ];
const adminEmails = [
  "admin@gmail.com"
];

  
// // Student emails with 22- prefix
// const studentEmails = [
//   " ", "22-00002@g.batstate-u.edu.ph", "22-00003@g.batstate-u.edu.ph",
//   "22-00004@g.batstate-u.edu.ph", "22-00005@g.batstate-u.edu.ph", "22-00006@g.batstate-u.edu.ph",
//   "22-00007@g.batstate-u.edu.ph", "22-00008@g.batstate-u.edu.ph", "22-00009@g.batstate-u.edu.ph",
//   "22-00010@g.batstate-u.edu.ph", "22-00011@g.batstate-u.edu.ph", "22-00012@g.batstate-u.edu.ph",
//   "22-00013@g.batstate-u.edu.ph", "22-00014@g.batstate-u.edu.ph", "22-00015@g.batstate-u.edu.ph",
//   "22-00016@g.batstate-u.edu.ph", "22-00017@g.batstate-u.edu.ph", "22-00018@g.batstate-u.edu.ph",
//   "22-00019@g.batstate-u.edu.ph", "22-00020@g.batstate-u.edu.ph", "22-00021@g.batstate-u.edu.ph",
//   "22-00022@g.batstate-u.edu.ph", "22-00023@g.batstate-u.edu.ph", "22-00024@g.batstate-u.edu.ph",
//   "22-00025@g.batstate-u.edu.ph", "22-00026@g.batstate-u.edu.ph", "22-00027@g.batstate-u.edu.ph",
//   "22-00028@g.batstate-u.edu.ph", "22-00029@g.batstate-u.edu.ph", "22-00030@g.batstate-u.edu.ph",
//   "22-00031@g.batstate-u.edu.ph", "22-00032@g.batstate-u.edu.ph", "22-00033@g.batstate-u.edu.ph",
//   "22-00034@g.batstate-u.edu.ph", "22-00035@g.batstate-u.edu.ph", "22-00036@g.batstate-u.edu.ph",
//   "22-00037@g.batstate-u.edu.ph", "22-00038@g.batstate-u.edu.ph", "22-00039@g.batstate-u.edu.ph",
//   "22-00040@g.batstate-u.edu.ph", "22-00041@g.batstate-u.edu.ph", "22-00042@g.batstate-u.edu.ph",
//   "22-00043@g.batstate-u.edu.ph", "22-00044@g.batstate-u.edu.ph", "22-00045@g.batstate-u.edu.ph",
//   "22-00046@g.batstate-u.edu.ph", "22-00047@g.batstate-u.edu.ph", "22-00048@g.batstate-u.edu.ph",
//   "22-00049@g.batstate-u.edu.ph", "22-00050@g.batstate-u.edu.ph"
// ];

const userRegister = async () => {
  await connectToDatabase();

  try {
    // Faculty users creation
    // for (let email of facultyEmails) {
    //   const name = email.split('@')[0];
    //   const hashPassword = await bcrypt.hash(name, 10); // Password is the name part of the email
    //   await User.create({
    //     name: name,
    //     email: email,
    //     password: hashPassword,
    //     role: "faculty",
    //   });
    //   console.log(`Faculty user ${name} created successfully.`);
    // }
    for (let email of adminEmails) {
      const name = email.split('@')[0];
      const hashPassword = await bcrypt.hash(name, 10); // Password is the name part of the email
      await User.create({
        name: name,
        email: email,
        password: hashPassword,
        role: "admin",
      });
      console.log(`admin user ${name} created successfully.`);
    }

    // Student users creation with section
    // for (let email of studentEmails) {
    //   const name = email.split('@')[0];
    //   const hashPassword = await bcrypt.hash(name, 10); // Password is the name part of the email

    //   // You can assign sections based on any criteria, here I'm randomly assigning sections for simplicity
    //   const section = `320${Math.floor(Math.random() * 5) + 1}`; // Assigning random section 3201-3205

    //   // Creating student user
    //   const user = await User.create({
    //     name: name,
    //     email: email,
    //     password: hashPassword,
    //     role: "student",
    //   });

    //   // Creating student record with reference to userId
    //   await Student.create({
    //     name: name,
    //     section: section, // Assigning the section to student
    //     userId: user.id,  // Foreign key to User
    //     yearLevel: "3rd Year", // Example year level, adjust if needed
    //   });

    //   console.log(`Student user ${name} with section ${section} created successfully.`);
    // }
  } catch (error) {
    console.error("Error inserting users:", error);
  } finally {
    await sequelize.close();
  }
};

userRegister();
