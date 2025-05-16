import leagueService from '../src/services/league.service';
import leagueRepository from '../src/repositories/league/league.repository';
import { PLATFORM_TO_REGION } from '../src/repositories/league/league.repository';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const RATE_LIMIT = 120; // requests per minute
const SLEEP_TIME = 60_000 / RATE_LIMIT;
const BATCH_SIZE = 100000;

const seenPuuids = new Set<string>();
const seenMatches = new Set<string>();

const csvHeader = [
  'match_id', 'data_version', 'queue_id', 'game_id', 'game_mode', 'game_type', 'game_name', 'game_version',
  'map_id', 'end_of_game_result', 'game_creation', 'game_start_time', 'game_end_time', 'game_duration',
  'participant_puuid', 'summoner_id', 'summoner_name', 'team_position', 'champion_id', 'champion_name',
  'kills', 'deaths', 'assists', 'gold_earned', 'total_damage_dealt', 'total_damage_taken', 'vision_score',
  'win', 'team_id', 'item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'summoner_1_id', 'summoner_2_id'
].join(',');

function getCsvPath(batchIndex: number) {
  return path.join(__dirname, `matches_${batchIndex}.csv`);
}

function writeCsvHeaderIfNeeded(csvPath: string) {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, csvHeader + '\n');
  }
}

function matchToCsvRows(match: any): string[] {
  if (!match?.info?.participants) return [];
  return match.info.participants.map((p: any) => [
    match.metadata.matchId,
    match.metadata.dataVersion,
    match.info.queueId,
    match.info.gameId,
    match.info.gameMode,
    match.info.gameType,
    match.info.gameName,
    match.info.gameVersion,
    match.info.mapId,
    match.info.endOfGameResult,
    match.info.gameCreation,
    match.info.gameStartTimestamp,
    match.info.gameEndTimestamp,
    match.info.gameDuration,
    p.puuid,
    p.summonerId,
    p.summonerName,
    p.individualPosition,
    p.championId,
    p.championName,
    p.kills,
    p.deaths,
    p.assists,
    p.goldEarned,
    p.totalDamageDealt,
    p.totalDamageTaken,
    p.visionScore,
    p.win,
    p.teamId,
    p.item0,
    p.item1,
    p.item2,
    p.item3,
    p.item4,
    p.item5,
    p.item6,
    p.summoner1Id,
    p.summoner2Id
  ].join(','));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ingest(seedPuuid: string, platform: string = 'NA1', maxDepth: number = 10000) {
  let batchIndex = 0;
  let matchesInBatch = 0;
  let processed = 0;
  let csvPath = getCsvPath(batchIndex);
  writeCsvHeaderIfNeeded(csvPath);
  const queue: string[] = [seedPuuid];

  while (queue.length && processed < maxDepth) {
    const puuid = queue.shift()!;
    if (seenPuuids.has(puuid)) continue;
    seenPuuids.add(puuid);
    console.log(`Processing summoner PUUID: ${puuid}`);

    let matchIds: string[] = [];
    try {
      matchIds = (await leagueService.getMatchesIds(puuid, 10, platform as any)) || [];
      console.log(`Fetched match IDs for ${puuid}:`, matchIds);
      if (!matchIds.length) {
        console.log(`No matches found for PUUID: ${puuid}`);
      }
    } catch (e) {
      console.error('Error fetching match IDs for', puuid, e);
      await sleep(SLEEP_TIME);
      continue;
    }
    await sleep(SLEEP_TIME);

    for (const matchId of matchIds) {
      if (seenMatches.has(matchId)) continue;
      seenMatches.add(matchId);

      let match: any;
      try {
        match = await leagueRepository.getMatchById(matchId, platform as any);
        if (match) {
          // Write to CSV
          const rows = matchToCsvRows(match);
          if (rows.length) {
            fs.appendFileSync(csvPath, rows.join('\n') + '\n');
            processed++;
            matchesInBatch++;
            console.log(`Wrote match ${matchId} to ${csvPath}`);
            if (matchesInBatch >= BATCH_SIZE) {
              batchIndex++;
              matchesInBatch = 0;
              csvPath = getCsvPath(batchIndex);
              writeCsvHeaderIfNeeded(csvPath);
            }
          }
        }
      } catch (e) {
        console.error('Error fetching match', matchId, e);
        await sleep(SLEEP_TIME);
        continue;
      }
      await sleep(SLEEP_TIME);
      if (match?.info?.participants) {
        for (const participant of match.info.participants) {
          if (!seenPuuids.has(participant.puuid)) {
            queue.push(participant.puuid);
            console.log(`Added participant PUUID to queue: ${participant.puuid}`);
          }
        }
      }
    }
  }
  console.log('Ingestion complete. Matches processed:', processed);
}

async function main() {
  const platform = process.argv[2]; // e.g., 'NA1'
  const gameName = process.argv[3]; // e.g., 'Doublelift'
  const tagLine = process.argv[4];  // e.g., 'NA1'

  // If the first argument looks like a PUUID (length 78), use it directly
  if (platform && platform.length > 50) {
    await ingest(platform, gameName || 'NA1');
    return;
  }

  // If no arguments, use a featured player as the seed
  if (!platform) {
    const defaultPlatform = 'NA1';
    console.log('No arguments provided. Fetching a featured player as the seed...');
    const featured = await leagueService.getFeaturedSummoner(defaultPlatform as any);
    if (!featured || !featured.puuid) {
      console.error('Could not fetch a featured player.');
      process.exit(1);
    }
    console.log(`Using featured player: ${featured.summonerName}#${featured.gameName || featured.tagLine || ''} (PUUID: ${featured.puuid}) on platform ${defaultPlatform}`);
    await ingest(featured.puuid, defaultPlatform);
    return;
  }

  if (!platform || !gameName || !tagLine) {
    console.error('Usage: ts-node ingest_games.ts <platform> <gameName> <tagLine>');
    process.exit(1);
  }
  const region = PLATFORM_TO_REGION[platform as keyof typeof PLATFORM_TO_REGION];
  const summoner = await leagueService.getSummonerByRiotId(gameName, tagLine, region as any);
  if (!summoner || !summoner.puuid) {
    console.error('Could not find summoner PUUID for', gameName, tagLine, region);
    process.exit(1);
  }
  console.log(`Resolved summoner ${gameName}#${tagLine} (${platform}, ${region}) to PUUID: ${summoner.puuid}`);
  if (summoner.puuid) {
    console.log(`PUUID found for ${gameName}#${tagLine}: ${summoner.puuid}`);
  }
  await ingest(summoner.puuid, platform);
}

if (require.main === module) {
  main().catch(console.error);
}
