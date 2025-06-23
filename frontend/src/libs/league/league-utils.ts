import axios from "axios";
import { Game, Summoner } from "./league-types";

let latestVersion = '14.15.1';

axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then(
  res => {
    const versions = res?.data;
    if (Array.isArray(versions) && versions.length > 0) {
      latestVersion = versions[0];
    }
  }
);


export const getChampionIconSrc = (championImageId: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championImageId}.png`;
}

export const getSummonerSpellIconSrc = (summonerSpellName: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${summonerSpellName}.png`
}

export const getItemIconSrcById = (itemId: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${itemId}.png`
}

export const getTeams = (game: Game | null) => {
  if (!game?.gameId) return { allies: null, enemies: null }
  const searchedSummonerPuuid = game.searchedSummoner.puuid;
  const searchedSummoner = game.participants.find(p => p.puuid === searchedSummonerPuuid) as Summoner;
  const allies = [searchedSummoner, ...game.participants.filter(p => p.teamId === searchedSummoner?.teamId && p.puuid !== searchedSummonerPuuid)];
  const enemies = game.participants.filter(p => !allies.includes(p));

  return { allies, enemies };
};

export const getWinRateString = (wins: number, losses: number) => {
  const total = wins + losses;
  return `${Math.round((wins / total) * 100)}%  (${total} Total)`
}