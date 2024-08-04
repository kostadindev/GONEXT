import { Request, Response } from 'express';
import championsService from '../../services/champions.service';

class ChampionsController {
  async getMatchupTips(req: Request, res: Response) {
    const { summonerChampion, enemyChampion } = req.query;
    if (typeof summonerChampion !== 'string' || typeof enemyChampion !== 'string') {
      return res.status(400).send('Both summonerChampion and enemyChampion must be provided.');
    }
    try {
      const tips = await championsService.getMatchupTips(summonerChampion, enemyChampion);
      res.json(tips);
    } catch (error) {
      res.status(500).send("Unknown error");
    }
  }
}

export default new ChampionsController();
