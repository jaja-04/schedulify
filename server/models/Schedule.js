// models/Schedule.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js';
import Course from './Course.js';
import Room from './Room.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

User.hasMany(Schedule, { foreignKey: 'facultyId', as: 'schedules' });
Schedule.belongsTo(User, { foreignKey: 'facultyId', as: 'faculty' });

Course.hasMany(Schedule, { foreignKey: 'courseId', as: 'courseSchedules' });
Schedule.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Room.hasMany(Schedule, { foreignKey: 'roomId', as: 'roomSchedules' });
Schedule.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

export default Schedule;
