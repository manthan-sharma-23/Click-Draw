/*
  Warnings:

  - You are about to drop the column `tasksId` on the `Option` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_tasksId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "tasksId",
ADD COLUMN     "taskId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "responseLimit" SET DEFAULT 15;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
