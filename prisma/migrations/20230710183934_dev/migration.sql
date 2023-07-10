/*
  Warnings:

  - You are about to drop the column `userId` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `givenReviews` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewSender` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_userId_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "userId",
ADD COLUMN     "givenReviews" INTEGER NOT NULL,
ADD COLUMN     "reviewSender" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_reviewSender_fkey" FOREIGN KEY ("reviewSender") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_givenReviews_fkey" FOREIGN KEY ("givenReviews") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
