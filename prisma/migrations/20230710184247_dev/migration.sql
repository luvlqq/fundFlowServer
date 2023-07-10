/*
  Warnings:

  - You are about to drop the column `givenReviews` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `reviewReciper` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_givenReviews_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "givenReviews",
ADD COLUMN     "reviewReciper" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_reviewReciper_fkey" FOREIGN KEY ("reviewReciper") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
