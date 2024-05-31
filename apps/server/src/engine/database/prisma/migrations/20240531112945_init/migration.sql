/*
  Warnings:

  - You are about to drop the column `fund` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `funds` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Options" DROP CONSTRAINT "Options_tasksId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "fund",
ADD COLUMN     "funds" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Options";

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "serial_no" INTEGER DEFAULT 0,
    "image_url" TEXT NOT NULL,
    "tasksId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
