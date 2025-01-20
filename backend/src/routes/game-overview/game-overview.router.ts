import express from "express";
import gameOverviewController from "./game-overview.controller";
import { authenticateToken } from "../../middlewares/auth.middleware";

const gameOverviewRouter = express.Router();

gameOverviewRouter.use(authenticateToken);

// Route to retrieve a game overview
gameOverviewRouter.post("/api/game-overview", gameOverviewController.getGameOverview);

export default gameOverviewRouter;
