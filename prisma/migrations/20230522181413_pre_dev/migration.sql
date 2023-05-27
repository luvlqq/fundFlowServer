/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `accountStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarImg` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "accountStatus" TEXT NOT NULL,
ADD COLUMN     "avatarImg" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "hashPassword" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "Currencies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
