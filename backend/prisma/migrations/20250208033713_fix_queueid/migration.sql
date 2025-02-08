/*
  Warnings:

  - You are about to drop the column `queueId` on the `matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "queueId",
ADD COLUMN     "queue_id" INTEGER;
