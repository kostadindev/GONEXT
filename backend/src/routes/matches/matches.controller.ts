import { Request, Response } from 'express';
import leagueService from '../../services/league.service';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const filePath = path.join(__dirname, '..', '..', '..', 'mocks', 'active_game.json');

function getActiveMatch(req: Request, res: Response): void {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading the file');
    }

    try {
      const activeMatch = leagueService.getEnrichedGame(JSON.parse(data));
      res.json(activeMatch);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON data');
    }
  });
}

async function getMatchHistory(req: Request, res: Response) {
  const { region, puuid } = req.query;

  if (typeof region !== 'string' || typeof puuid !== 'string') {
    return res.status(400).send('Both region and PUUID must be provided.');
  }

  try {
    const matchIds = await leagueService.getMatchesIds(puuid) || [] as string[];
    const matches = (await leagueService.getMatchesByIds(matchIds)).map(
      (match: any) => {
        const participants = leagueService.getParticipantsFromMatch(match);
        let participant = match?.info?.participants.find((p: any) => p?.puuid === puuid);

        if (participant) {
          participant = {
            ...participant,
            summonerSpell1Name: leagueService.getSummonerSpellName(participant.summoner1Id?.toString()),
            summonerSpell2Name: leagueService.getSummonerSpellName(participant.summoner2Id?.toString()),
            championImageId: leagueService.getChampionImageId(participant?.championId)
          } as any;
        }

        return {
          win: participant?.win,
          gameCreation: match?.info?.gameCreation,
          gameDuration: match?.info?.gameDuration,
          gameMode: match?.info?.gameMode,
          matchId: match?.metadata?.matchId,
          queueName: match?.info?.queueName,
          participant,
          participants
        };
      }
    );

    res.json(matches);
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).send('Unknown error');
  }
}

export { getActiveMatch, getMatchHistory };
