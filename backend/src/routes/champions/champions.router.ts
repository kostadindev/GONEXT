import express from 'express';
import championsController from './champions.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const championsRouter = express.Router();

championsRouter.use(authenticateToken);

export default championsRouter;
