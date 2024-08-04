import express from 'express';
import { getActiveMatch, getMatchHistory } from './matches.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const matchesRouter = express.Router();
matchesRouter.use(authenticateToken);
matchesRouter.get('/api/matches/active', getActiveMatch);
matchesRouter.get('/api/matches/history', getMatchHistory);

export { matchesRouter };