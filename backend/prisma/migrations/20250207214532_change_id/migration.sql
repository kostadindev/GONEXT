/*
  Warnings:

  - The primary key for the `match_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `participant_id` to the `match_participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match_participants" DROP CONSTRAINT "match_participants_pkey",
ADD COLUMN     "participant_id" TEXT NOT NULL,
ADD CONSTRAINT "match_participants_pkey" PRIMARY KEY ("participant_id");
