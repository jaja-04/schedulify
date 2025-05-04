// db/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Step 1: Temporarily connect WITHOUT specifying a database
const rawSequelize = new Sequelize(
  null, // No database yet
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// Step 2: Ensure the target database exists
await rawSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`)
  .then(() => console.log("✅ Database checked/created successfully."))
  .catch((err) => console.error("❌ Error creating database:", err));

// Step 3: Close the temporary connection
await rawSequelize.close();

// Step 4: Connect to the actual database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Enable SQL logging
  }
);

// Optional: Health check function
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};

export default sequelize;
export { connectToDatabase };
