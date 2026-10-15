import {Sequelize} from 'sequelize';
const sequelize= new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});
export const connectDB=async ()=>{
  try {
    await sequelize.sync();
    console.log('Database connected & synced successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};
export default sequelize;