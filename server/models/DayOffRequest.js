import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const DayOffRequest = sequelize.define('DayOffRequest', {
  selectedDate: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
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
  tableName: 'day_off_requests',
});

export default DayOffRequest;
