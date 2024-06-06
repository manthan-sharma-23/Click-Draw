-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "from" TEXT,
ADD COLUMN     "to" TEXT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;
