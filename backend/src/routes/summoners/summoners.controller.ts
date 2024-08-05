import { Request, Response } from 'express';
import leagueService from '../../services/league.service';

class SummonersController {
  async getSummonerStats(req: Request, res: Response) {
    const { region, puuid } = req.query;

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
  }

  async getSummonerByRiotId(req: Request, res: Response) {
    const { gameName, tagLine } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string') {
      return res.status(400).send('Both gameName and tagLine must be provided.');
    }

    try {
      const summoner = await leagueService.getSummonerByRiotId(gameName, tagLine);
      if (summoner) {
        res.json(summoner);
      } else {
        res.status(404).send('Summoner not found.');
      }
    } catch (error) {
      res.status(500).send('An error occurred while fetching the summoner.');
    }
  }

  async getActiveGame(req: Request, res: Response) {
    const { gameName, tagLine } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string') {
      return res.status(400).send('Both gameName and tagLine must be provided.');
    }

    const { puuid } = await leagueService.getSummonerByRiotId(gameName as string, tagLine as string);

    try {
      const activeGame = await leagueService.getActiveGameByPuuid(puuid);
      const enrichedGame = await leagueService.getEnrichedGame(activeGame, puuid);
      if (enrichedGame) {
        res.json(enrichedGame);
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).send('An error occurred while fetching the active game.');
    }
  }

  async getFeaturedSummoner(req: Request, res: Response) {
    try {
      const featuredGames = await leagueService.getFeaturedGames();
      if (!featuredGames || featuredGames.gameList.length === 0) {
        return res.status(204).send('No featured games available.');
      }

      // Select a random game and then a random participant from that game
      const randomGame = featuredGames.gameList[Math.floor(Math.random() * featuredGames.gameList.length)];
      const randomParticipant = randomGame.participants[Math.floor(Math.random() * randomGame.participants.length)];

      if (randomParticipant) {
        res.json(randomParticipant);
      } else {
        res.status(404).send('Featured summoner not found.');
      }
    } catch (error) {
      res.status(500).send('An error occurred while fetching the featured summoner.');
    }
  }
}

export default new SummonersController();
