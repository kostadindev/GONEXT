/*
  Warnings:

  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchParticipant" DROP CONSTRAINT "MatchParticipant_match_id_fkey";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "MatchParticipant";

-- CreateTable
CREATE TABLE "match_participant" (
    "participant_id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "summoner_id" TEXT,
    "summoner_name" TEXT,
    "team_position" TEXT,
    "champion_id" INTEGER,
    "champion_name" TEXT,
    "kills" INTEGER,
    "deaths" INTEGER,
    "assists" INTEGER,
    "gold_earned" INTEGER,
    "total_damage_dealt" BIGINT,
    "total_damage_taken" BIGINT,
    "vision_score" INTEGER,
    "win" BOOLEAN,
    "team_id" INTEGER,

    CONSTRAINT "match_participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "match" (
    "match_id" TEXT NOT NULL,
    "data_version" TEXT,
    "game_id" BIGINT NOT NULL,
    "game_mode" TEXT,
    "game_type" TEXT,
    "game_name" TEXT,
    "game_version" TEXT,
    "map_id" INTEGER,
    "end_of_game_result" TEXT,
    "game_creation" BIGINT,
    "game_start_time" BIGINT,
    "game_end_time" BIGINT,
    "game_duration" INTEGER,

    CONSTRAINT "match_pkey" PRIMARY KEY ("match_id")
);

-- CreateIndex
CREATE INDEX "match_participants_pkey" ON "match_participant"("participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "match_game_id_key" ON "match"("game_id");

-- CreateIndex
CREATE INDEX "matches_pkey" ON "match"("match_id");

-- CreateIndex
CREATE INDEX "matches_game_id_key" ON "match"("game_id");

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("match_id") ON DELETE CASCADE ON UPDATE CASCADE;
