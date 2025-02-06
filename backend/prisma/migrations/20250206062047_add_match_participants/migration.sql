-- CreateTable
CREATE TABLE "MatchParticipant" (
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

    CONSTRAINT "MatchParticipant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "Match" (
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

    CONSTRAINT "Match_pkey" PRIMARY KEY ("match_id")
);

-- CreateIndex
CREATE INDEX "match_participants_pkey" ON "MatchParticipant"("participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_game_id_key" ON "Match"("game_id");

-- CreateIndex
CREATE INDEX "matches_pkey" ON "Match"("match_id");

-- CreateIndex
CREATE INDEX "matches_game_id_key" ON "Match"("game_id");

-- AddForeignKey
ALTER TABLE "MatchParticipant" ADD CONSTRAINT "MatchParticipant_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("match_id") ON DELETE CASCADE ON UPDATE CASCADE;
