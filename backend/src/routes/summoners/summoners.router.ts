import express from 'express';
import SummonersController from './summoners.controller';

const summonersRouter = express.Router();

summonersRouter.get('/api/summoners/stats', SummonersController.getSummonerStats);

export default summonersRouter;
