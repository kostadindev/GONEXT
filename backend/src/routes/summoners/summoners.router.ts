

import express from 'express';
import { getSummonerStats } from './summoners.controller';

const summonersRouter = express.Router();

summonersRouter.get('/api/summoners/stats', getSummonerStats);

export { summonersRouter };