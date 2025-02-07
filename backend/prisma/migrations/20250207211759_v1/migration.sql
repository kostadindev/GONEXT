/*
  Warnings:

  - The primary key for the `match_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `participant_id` on the `match_participants` table. All the data in the column will be lost.
  - Added the required column `puuid` to the `match_participants` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_match_participant_id";

-- AlterTable
ALTER TABLE "match_participants" DROP CONSTRAINT "match_participants_pkey",
DROP COLUMN "participant_id",
ADD COLUMN     "puuid" TEXT NOT NULL,
ADD CONSTRAINT "match_participants_pkey" PRIMARY KEY ("puuid");

-- CreateIndex
CREATE INDEX "idx_match_participant_puuid" ON "match_participants"("puuid");
