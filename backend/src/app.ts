import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { AIService } from "./services/ai.service";
import { matchesRouter } from "./routes/matches/matches.router";
import { summonersRouter } from "./routes/summoners/summoners.router";
import { championsRouter } from "./routes/champions/champions.router";

// Initialize environment variables
dotenv.config();

const app: Express = express();
const aiService = new AIService();

// Middleware setup
app.use(cors());
app.use(morgan("dev"));

// Route handlers
app.use(matchesRouter);
app.use(summonersRouter);
app.use(championsRouter);

app.get("/api/matchup", async (req: Request, res: Response) => {
  const { summonerChampion, enemyChampion } = req.query;

  if (typeof summonerChampion !== "string" || typeof enemyChampion !== "string") {
    return res.status(400).send("Both summonerChampion and enemyChampion must be provided.");
  }

  try {
    const tips = await aiService.getMatchupTips(summonerChampion, enemyChampion);
    res.json(tips);
  } catch (error) {
    res.status(500).send("Unknown error");
  }
});

export default app;
