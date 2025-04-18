import express from 'express';
import chatbotController from './chatbot.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { rateLimiter } from '../../middlewares/rate-limiter.middleware';
const chatbotRouter = express.Router();

// chatbotRouter.use(authenticateToken);

// Route to send a chat message
chatbotRouter.post('/api/chatbot/:sessionId/chat', rateLimiter(), chatbotController.sendMessage);

chatbotRouter.post(
  "/api/chatbot/suggestions",
  rateLimiter(),
  chatbotController.getFollowUpSuggestions
);


export default chatbotRouter;