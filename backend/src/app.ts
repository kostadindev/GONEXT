import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { AIService } from "./services/ai.service";
const morgan = require('morgan');
const matchesRouter = require('./routes/matches/matches.router')
const summonersRouter = require('./routes/summoners/summoners.router')
const championsRouter = require('./routes/champions/champions.router')



dotenv.config();
const app: Express = express();
const aiService = new AIService();

app.use(cors());

// const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs.log'), { flags: 'a' });
app.use(
  morgan('dev',
    //{ stream: accessLogStream }
  ));



app.use(matchesRouter);
app.use(summonersRouter);
app.use(championsRouter);

app.get('/api/matchup', async (req: Request, res: Response) => {
  const { summonerChampion, enemyChampion } = req.query;
  if (typeof summonerChampion !== 'string' || typeof enemyChampion !== 'string') {
    return res.status(400).send('Both summonerChampion and enemyChampion must be provided.');
  }
  try {
    const tips = await aiService.getMatchupTips(summonerChampion, enemyChampion);
    res.json(tips);

  } catch (error) {
    res.status(500).send("Unknown error");
  }

})

module.exports = app;