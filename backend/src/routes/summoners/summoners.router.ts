import express from 'express';
import SummonersController from './summoners.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const summonersRouter = express.Router();

summonersRouter.use(authenticateToken);

summonersRouter.get('/api/summoners/stats', SummonersController.getSummonerStats);

export default summonersRouter;
