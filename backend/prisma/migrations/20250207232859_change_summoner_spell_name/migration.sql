/*
  Warnings:

  - You are about to drop the column `summoner_spell1` on the `match_participants` table. All the data in the column will be lost.
  - You are about to drop the column `summoner_spell2` on the `match_participants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "match_participants" DROP COLUMN "summoner_spell1",
DROP COLUMN "summoner_spell2",
ADD COLUMN     "summoner1Id" INTEGER,
ADD COLUMN     "summoner2Id" INTEGER;
