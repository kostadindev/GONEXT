/*
  Warnings:

  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `match_participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "match_participant" DROP CONSTRAINT "match_participant_match_id_fkey";

-- DropTable
DROP TABLE "match";

-- DropTable
DROP TABLE "match_participant";

-- CreateTable
CREATE TABLE "match_participants" (
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

    CONSTRAINT "match_participants_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "matches" (
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

    CONSTRAINT "matches_pkey" PRIMARY KEY ("match_id")
);

-- CreateIndex
CREATE INDEX "idx_match_participant_id" ON "match_participants"("participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_matches_game_id" ON "matches"("game_id");

-- CreateIndex
CREATE INDEX "idx_matches_match_id" ON "matches"("match_id");

-- CreateIndex
CREATE INDEX "idx_matches_game_id" ON "matches"("game_id");

-- AddForeignKey
ALTER TABLE "match_participants" ADD CONSTRAINT "match_participants_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("match_id") ON DELETE CASCADE ON UPDATE CASCADE;
