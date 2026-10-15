import express from 'express';
import { 
  createMessage, 
  getMyMessages, 
  updateMessage, 
  deleteMessage 
} from '../controllers/messageController.js';
import { authMiddleware } from '../middlewares/auth.js';
const messageRouter = express.Router();
messageRouter.use(authMiddleware);
messageRouter.post('/', createMessage);
messageRouter.get('/', getMyMessages);
messageRouter.put('/:id', updateMessage);
messageRouter.delete('/:id', deleteMessage);
export default messageRouter;