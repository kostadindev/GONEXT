import { Request, Response } from 'express';
import leagueService from '../../services/league.service';

class SummonersController {
  async getSummonerStats(req: Request, res: Response) {
    const { region, puuid } = req.query;

    if (typeof region !== 'string' || typeof puuid !== 'string') {
      return res.status(400).json({ error: 'Both region and PUUID must be provided and should be strings.' });
    }

    try {
      const stats = await leagueService.getSummonerStats(puuid);
      if (stats) {
        res.json(stats);
      } else {
        res.status(404).json({ error: 'Summoner stats not found.' });
      }
    } catch (error) {
      console.error('Error fetching summoner stats:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching summoner stats.' });
    }
  }

  async getSummonerByRiotId(req: Request, res: Response) {
    const { gameName, tagLine } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string') {
      return res.status(400).json({ error: 'Both gameName and tagLine must be provided and should be strings.' });
    }

    try {
      const summoner = await leagueService.getSummonerByRiotId(gameName, tagLine);
      if (summoner) {
        res.json(summoner);
      } else {
        res.status(404).json({ error: 'Summoner not found.' });
      }
    } catch (error) {
      console.error('Error fetching summoner by Riot ID:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching the summoner.' });
    }
  }

  async getActiveGame(req: Request, res: Response) {
    const { gameName, tagLine } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string') {
      return res.status(400).json({ error: 'Both gameName and tagLine must be provided and should be strings.' });
    }

    try {
      const summoner = await leagueService.getSummonerByRiotId(gameName, tagLine);

      if (!summoner || !summoner.puuid) {
        return res.status(404).json({ error: 'Summoner not found or missing PUUID.' });
      }

      const activeGame = await leagueService.getActiveGameByPuuid(summoner.puuid);
      const enrichedGame = await leagueService.getEnrichedGame(activeGame, summoner.puuid);

      if (enrichedGame) {
        res.json(enrichedGame);
      } else {
        res.status(204).json({ message: 'No active game found.' });
      }
    } catch (error) {
      console.error('Error fetching active game:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching the active game.' });
    }
  }

  async getFeaturedSummoner(req: Request, res: Response) {
    try {
      const featuredSummoner = await leagueService.getFeaturedSummoner();
      if (featuredSummoner) {
        res.json(featuredSummoner);
      } else {
        res.status(404).json({ error: 'Featured summoner not found.' });
      }
    } catch (error) {
      console.error('Error fetching featured summoner:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching the featured summoner.' });
    }
  }
}

export default new SummonersController();
