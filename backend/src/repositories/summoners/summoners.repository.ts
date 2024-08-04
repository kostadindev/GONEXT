import { LeagueService } from "../../services/league.service";

const leagueService = new LeagueService();

class SummonersRepository {
  async getSummonerStats(puuid: string): Promise<any> {
    try {
      // Add logic to fetch summoner stats from the database or external service
      // For example, using a database model or an API client
      // return await Summoner.findStatsByPuuid(puuid);
      return await leagueService.getSummonerStats(puuid);; // Placeholder for actual implementation
    } catch (error) {
      throw new Error(`Error fetching summoner stats: ${error}`);
    }
  }
}

export default new SummonersRepository();
