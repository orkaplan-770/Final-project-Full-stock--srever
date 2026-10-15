import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dataBase.js';
import { generalLimiter } from './middlewares/rateLimiter.js';
import userRouter from './routes/userRouter.js';
import messageRouter from './routes/messageRouter.js';
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(generalLimiter); 

app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'הנתיב המבוקש לא נמצא בשרת' });
});
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
startServer();