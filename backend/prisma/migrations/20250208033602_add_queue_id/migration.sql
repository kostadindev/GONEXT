/*
  Warnings:

  - You are about to drop the column `queue_name` on the `matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "queue_name",
ADD COLUMN     "queueId" INTEGER;
