import express from 'express';
import championsController from './champions.controller';

const championsRouter = express.Router();

championsRouter.get('/api/champions/matchup', championsController.getMatchupTips);

export default championsRouter;
