/*
  Warnings:

  - You are about to drop the column `languagesId` on the `topicInfo` table. All the data in the column will be lost.
  - You are about to drop the column `topicsId` on the `topicInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[language]` on the table `languages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `languages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "topicInfo" DROP CONSTRAINT "topicInfo_languagesId_fkey";

-- DropForeignKey
ALTER TABLE "topicInfo" DROP CONSTRAINT "topicInfo_topicsId_fkey";

-- AlterTable
ALTER TABLE "topicInfo" DROP COLUMN "languagesId",
DROP COLUMN "topicsId",
ADD COLUMN     "languageId" INTEGER,
ADD COLUMN     "topicId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "languages_language_key" ON "languages"("language");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- AddForeignKey
ALTER TABLE "topicInfo" ADD CONSTRAINT "topicInfo_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topicInfo" ADD CONSTRAINT "topicInfo_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
