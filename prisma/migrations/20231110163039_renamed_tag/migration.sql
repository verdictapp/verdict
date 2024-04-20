/*
  Warnings:

  - You are about to drop the column `tag` on the `tags` table. All the data in the column will be lost.
  - Added the required column `name` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "tag",
ADD COLUMN     "name" TEXT NOT NULL;
