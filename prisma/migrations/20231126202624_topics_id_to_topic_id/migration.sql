/*
  Warnings:

  - You are about to drop the column `topicsId` on the `tagged` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tagged" DROP CONSTRAINT "tagged_topicsId_fkey";

-- AlterTable
ALTER TABLE "tagged" DROP COLUMN "topicsId",
ADD COLUMN     "topicId" INTEGER;

-- AddForeignKey
ALTER TABLE "tagged" ADD CONSTRAINT "tagged_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
