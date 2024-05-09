import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from 'fs';
import cors from 'cors';
import { LeagueService } from "./services/league.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const leagueService = new LeagueService();

app.use(cors());

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



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});