import express from 'express';
import SummonersController from './summoners.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const summonersRouter = express.Router();

summonersRouter.use(authenticateToken);

summonersRouter.get('/api/summoners/stats', SummonersController.getSummonerStats);
summonersRouter.get('/api/summoners/by-riot-id', SummonersController.getSummonerByRiotId);
summonersRouter.get('/api/summoners/active-game', SummonersController.getActiveGame);
summonersRouter.get('/api/summoners/featured-summoner', SummonersController.getFeaturedSummoner); // New route

export default summonersRouter;
