/*
  Warnings:

  - You are about to drop the column `post` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `posts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `User` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "post",
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author",
DROP COLUMN "comments",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "posts",
DROP COLUMN "comments";

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
