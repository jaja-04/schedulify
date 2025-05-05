// models/Course.js
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Course = sequelize.define("Course", {
  courseId: {
    type: DataTypes.STRING,
    primaryKey: true,
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
  },
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'course',
});

export default Course;
