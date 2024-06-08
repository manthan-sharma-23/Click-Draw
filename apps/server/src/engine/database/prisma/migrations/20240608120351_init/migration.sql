/*
  Warnings:

  - You are about to drop the column `address` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "address",
ADD COLUMN     "signature" TEXT;
