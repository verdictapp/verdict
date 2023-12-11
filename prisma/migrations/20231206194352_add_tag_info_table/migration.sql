/*
  Warnings:

  - You are about to drop the column `name` on the `tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "tagInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "tagId" INTEGER,

    CONSTRAINT "tagInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tagInfo" ADD CONSTRAINT "tagInfo_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagInfo" ADD CONSTRAINT "tagInfo_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
