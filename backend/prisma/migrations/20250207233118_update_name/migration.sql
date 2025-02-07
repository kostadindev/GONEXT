/*
  Warnings:

  - You are about to drop the column `summoner1Id` on the `match_participants` table. All the data in the column will be lost.
  - You are about to drop the column `summoner2Id` on the `match_participants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "match_participants" DROP COLUMN "summoner1Id",
DROP COLUMN "summoner2Id",
ADD COLUMN     "summoner_1_id" INTEGER,
ADD COLUMN     "summoner_2_id" INTEGER;
