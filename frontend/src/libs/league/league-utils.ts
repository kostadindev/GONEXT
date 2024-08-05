import { Game, Summoner } from "./league-types";

export const getChampionIconSrc = (championImageId: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${championImageId}.png`;
}

export const getSummonerSpellIconSrc = (summonerSpellName: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/spell/${summonerSpellName}.png`
}

export const getItemIconSrc = (itemId: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/item/${itemId}.png`
}

export const getTeams = (game: Game | null) => {
  if (!game) return { allies: null, enemies: null }
  const searchedSummonerPuuid = game.searchedSummoner.puuid;
  const searchedSummoner = game.participants.find(p => p.puuid === searchedSummonerPuuid) as Summoner;
  const allies = [searchedSummoner, ...game.participants.filter(p => p.teamId === searchedSummoner?.teamId && p.puuid !== searchedSummonerPuuid)] || [];
  const enemies = game.participants.filter(p => !allies.includes(p));

  return { allies, enemies };
};

export const getWinRateString = (wins: number, losses: number) => {
  const total = wins + losses;
  return `${Math.round((wins / total) * 100)}%  (${total} Total)`
}