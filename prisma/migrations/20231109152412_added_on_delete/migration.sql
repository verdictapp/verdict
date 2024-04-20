/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tagged" DROP CONSTRAINT "tagged_tagId_fkey";

-- DropForeignKey
ALTER TABLE "tagged" DROP CONSTRAINT "tagged_topicsId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_topicId_fkey";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagged" ADD CONSTRAINT "tagged_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagged" ADD CONSTRAINT "tagged_topicsId_fkey" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
