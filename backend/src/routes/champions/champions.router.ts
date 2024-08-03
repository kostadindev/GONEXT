

import express from 'express';
import { getMatchupTips } from './champions.controller';

const championsRouter = express.Router();

championsRouter.get('/api/champions/matchup', getMatchupTips);

module.exports = championsRouter;