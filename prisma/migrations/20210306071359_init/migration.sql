/*
  Warnings:

  - You are about to drop the column `author` on the `Comment` table. All the data in the column will be lost.
  - Made the column `userId` on table `Comment` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "author",
ALTER COLUMN "userId" SET NOT NULL;
