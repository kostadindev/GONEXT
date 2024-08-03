import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { matchesRouter } from "./routes/matches/matches.router";
import { summonersRouter } from "./routes/summoners/summoners.router";
import { championsRouter } from "./routes/champions/champions.router";

// Initialize environment variables
dotenv.config();

const app: Express = express();

// Middleware setup
app.use(cors());
app.use(morgan("dev"));

// Route handlers
app.use(matchesRouter);
app.use(summonersRouter);
app.use(championsRouter);

export default app;
