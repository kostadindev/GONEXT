import express from 'express';
import { getActiveMatch, getMatchHistory } from './matches.controller';

const matchesRouter = express.Router();

matchesRouter.get('/api/matches/active', getActiveMatch);
matchesRouter.get('/api/matches/history', getMatchHistory);

module.exports = matchesRouter;
