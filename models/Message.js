import {DataTypes} from 'sequelize';
import sequelize from '../config/dataBase.js';

const Message=sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content:{
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default Message;