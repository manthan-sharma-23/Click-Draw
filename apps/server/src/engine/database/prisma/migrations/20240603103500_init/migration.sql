/*
  Warnings:

  - You are about to drop the `Submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_workerId_fkey";

-- DropTable
DROP TABLE "Submissions";

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
