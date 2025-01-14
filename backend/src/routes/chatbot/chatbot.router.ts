import express from 'express';
import chatbotController from './chatbot.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const chatbotRouter = express.Router();

chatbotRouter.use(authenticateToken);

// Route to send a chat message
chatbotRouter.post('/api/chatbot/:sessionId/chat', chatbotController.sendMessage);

export default chatbotRouter;