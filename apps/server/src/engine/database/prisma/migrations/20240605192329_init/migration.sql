/*
  Warnings:

  - You are about to drop the column `currentAmount` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `lockedAmount` on the `Worker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "currentAmount",
DROP COLUMN "lockedAmount";
