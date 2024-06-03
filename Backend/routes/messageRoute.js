import express from 'express';
import { ListMessages, Removemessage, sendMessage } from "../controllers/MessageController.js";
import authMiddleware from "../middleware/auth.js";
const MessageRouter = express.Router();

MessageRouter.post('/send',authMiddleware,sendMessage);
MessageRouter.get('/list',ListMessages);
MessageRouter.post('/remove',Removemessage);




export default MessageRouter;