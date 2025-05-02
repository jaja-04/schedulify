import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js';

const DayOffRequest = sequelize.define('DayOffRequest', {
  // The selected day off (e.g., "Monday", "Tuesday")
  selectedDate: {
    type: DataTypes.STRING, // You could also use `DATE` if you want a specific date type
    allowNull: false,
  },

  // The user ID making the request
  userId: {  // Changed 'id' to 'userId' to refer to the User model's ID
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Reference to the 'users' table
      key: 'id',      // Reference to the 'id' column in the User table
    },
  },

  // The status of the request (pending, accepted, or rejected)
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending', // Default status is "pending"
  },
  
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

  // Automatically handled fields for creation and updates
}, {
  timestamps: true, // Sequelize will handle createdAt and updatedAt automatically
  tableName: 'day_off_requests', // Optional: you can specify a custom table name
});

DayOffRequest.belongsTo(User, {
    foreignKey: 'userId',  // The foreign key on DayOffRequest
    as: 'requester',  // Alias for the User in associations (optional, for clarity)
  });

export default DayOffRequest;
