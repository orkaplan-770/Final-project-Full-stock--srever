import { DataTypes } from 'sequelize';
import sequelize from '../config/dataBase.js';
const User=sequelize.define('User',{
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  birthDate: {
    type: DataTypes.DATEONLY
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default User;