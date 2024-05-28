import express from 'express';
import { ListMessages, sendMessage } from "../controllers/MessageController.js";
import authMiddleware from "../middleware/auth.js";
const MessageRouter = express.Router();

MessageRouter.post('/send',authMiddleware,sendMessage);
MessageRouter.get('/list',ListMessages);




export default MessageRouter;