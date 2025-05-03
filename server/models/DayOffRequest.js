// Updated DayOffRequest model

import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js';  // Assuming you have a User model

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

// Use a unique alias for the association
DayOffRequest.belongsTo(User, { foreignKey: 'userId', as: 'userRequester' });

export default DayOffRequest;
