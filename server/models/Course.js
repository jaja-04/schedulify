// models/Course.js
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Course = sequelize.define("Course", {
    courseId: {
      type: DataTypes.STRING,
      primaryKey: true, // ✅ Make this the primary key
      allowNull: false,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    tableName: 'course',
  });
  

export default Course;
