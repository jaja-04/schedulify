import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import Course from './Course.js';
import Room from './Room.js';
import User from './User.js';

const Schedule = sequelize.define('Schedule', {
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Course,
      key: 'courseId',
    },
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
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
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  
}, {
  timestamps: true,
  tableName: 'schedule',
});

Schedule.belongsTo(Course, { foreignKey: 'courseId' });
Schedule.belongsTo(Room, { foreignKey: 'roomId' });
Schedule.belongsTo(User, { foreignKey: 'facultyId', as: 'faculty' }); // if you track faculty


export default Schedule;
