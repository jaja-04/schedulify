import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const FacultyCourse = sequelize.define("FacultyCourse", {
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default FacultyCourse;
