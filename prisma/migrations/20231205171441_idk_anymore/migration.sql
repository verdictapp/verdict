/*
  Warnings:

  - You are about to drop the column `uid` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_uid_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uid";
