
import { Request, Response } from 'express';
import { AIService } from '../../services/ai.service';
const aiService = new AIService();

async function getMatchupTips(req: Request, res: Response) {
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
}

export { getMatchupTips };