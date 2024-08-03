

import express from 'express';
const { getSummonerStats } = require('./summoners.controller');

const summonersRouter = express.Router();


summonersRouter.get('/api/summoners/stats', getSummonerStats);

module.exports = summonersRouter;