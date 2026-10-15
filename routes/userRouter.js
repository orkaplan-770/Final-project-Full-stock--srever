import express from 'express';
import { register, login } from '../controllers/userController.js';
import { validateFields, validateID, checkUserExists } from '../middlewares/validate.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
const userRouter = express.Router();
userRouter.post('/register', validateFields, validateID, checkUserExists, register);
userRouter.post('/login', authLimiter, login);
export default userRouter;