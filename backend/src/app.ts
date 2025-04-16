import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { matchesRouter } from "./routes/matches/matches.router";
import summonersRouter from "./routes/summoners/summoners.router";
import championsRouter from "./routes/champions/champions.router";
import sessionRouter from "./routes/sessions/sessions.router";
import authRouter from "./routes/auth/auth.routes";
import chatbotRouter from "./routes/chatbot/chatbot.router";
import tipsRouter from "./routes/tips/tips.router";
import usersRouter from "./routes/users/users.router";
import gameOverviewRouter from "./routes/game-overview/game-overview.router";
import path from "path";

dotenv.config();

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://24.45.172.199:3000", "http://gonext.lol:3000"],
    credentials: true,  // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));


app.use(authRouter);
app.use(matchesRouter);
app.use(summonersRouter);
app.use(championsRouter);
app.use(sessionRouter);
app.use(chatbotRouter);
app.use(tipsRouter);
app.use(usersRouter);
app.use(gameOverviewRouter);

export default app;
