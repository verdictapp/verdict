/*
  Warnings:

  - You are about to drop the column `description` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `topics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "topics" DROP COLUMN "description",
DROP COLUMN "options",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topicInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "options" JSONB NOT NULL,
    "topicsId" INTEGER,
    "languagesId" INTEGER,

    CONSTRAINT "topicInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topicInfo" ADD CONSTRAINT "topicInfo_topicsId_fkey" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topicInfo" ADD CONSTRAINT "topicInfo_languagesId_fkey" FOREIGN KEY ("languagesId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
