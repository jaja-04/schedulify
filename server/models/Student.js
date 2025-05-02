import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js'; // Import User model

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['3201', '3202', '3203', '3204', '3205']]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  yearLevel: {
    type: DataTypes.STRING,
    allowNull: false
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
  tableName: 'student',
  timestamps: true
});

Student.belongsTo(User, { foreignKey: 'userId', as: 'account' });
User.hasOne(Student, { foreignKey: 'userId', as: 'studentProfile' });

export default Student;