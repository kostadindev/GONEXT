import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from 'fs';
import cors from 'cors';
import { LeagueService } from "./services/league.service";
import { AIService } from "./services/ai.service";
const morgan = require('morgan');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const leagueService = new LeagueService();
const aiService = new AIService();

app.use(cors());

// const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs.log'), { flags: 'a' });

app.use(
  morgan('dev',
    //{ stream: accessLogStream }
  ));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScewqeqeript Server");
});


app.get('/api/active-game', (req, res) => {
  const filePath = path.join(__dirname, '..', 'mocks', 'active_game.json');


  fs.readFile(filePath, 'utf8', (err: any, data: any) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading the active game data');
    }

    try {
      const jsonData = leagueService.getEnrichedGame(JSON.parse(data));
      res.json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON data');
    }
  });
});

app.get('/api/summoner-stats', async (req, res) => {
  const { region, puuid } = req.query;

  // Validate that both region and puuid are provided
  if (typeof region !== 'string' || typeof puuid !== 'string') {
    return res.status(400).send('Both region and PUUID must be provided.');
  }

  try {
    const stats = await leagueService.getSummonerStats(puuid);
    if (stats) {
      res.json(stats);
    } else {
      res.status(404).send('Summoner stats not found.');
    }
  } catch (error) {
    res.status(500).send('An error occurred while fetching summoner stats.');
  }
});

app.get('/api/match-history', async (req: Request, res: Response) => {
  const { region, puuid } = req.query;
  // Validate that both region and puuid are provided
  if (typeof region !== 'string' || typeof puuid !== 'string') {
    return res.status(400).send('Both region and PUUID must be provided.');
  }
  try {
    const matchIds = await leagueService.getMatchesIds(puuid) || [];
    const matches = await Promise.all(matchIds.map(async (matchId) => {
      const match = await leagueService.getMatchById(matchId);;
      const participant = match?.info?.participants.find(participant => participant?.puuid === puuid);
      const result = {
        win: participant?.win,
        gameCreation: match?.info?.gameCreation,
        gameDuration: match?.info?.gameDuration,
        gameMode: match?.info?.gameMode,
        matchId: match?.metadata?.matchId,
        queueName: match?.info?.queueName
      }
      return result;
    }));
    res.json(matches);
  } catch (error) {
    res.status(500).send("Unknown error");
  }
})

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



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});