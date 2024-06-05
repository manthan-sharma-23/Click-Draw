-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "endAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "currentAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lockedAmount" INTEGER NOT NULL DEFAULT 0;
