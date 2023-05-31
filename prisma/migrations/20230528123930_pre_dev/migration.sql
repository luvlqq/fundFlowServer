/*
  Warnings:

  - You are about to drop the column `currencyId` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `hashPassword` on the `User` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerify` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "currencyId",
ADD COLUMN     "currency" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashPassword",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "isVerify" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "dateOfCreate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_currency_fkey" FOREIGN KEY ("currency") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
