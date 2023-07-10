/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Currencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `History` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OpenDeals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_currency_fkey";

-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_accountId_fkey";

-- DropForeignKey
ALTER TABLE "OpenDeals" DROP CONSTRAINT "OpenDeals_currencyToBuyId_fkey";

-- DropForeignKey
ALTER TABLE "OpenDeals" DROP CONSTRAINT "OpenDeals_currencyToSellId_fkey";

-- DropForeignKey
ALTER TABLE "OpenDeals" DROP CONSTRAINT "OpenDeals_dealerId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_reciperId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_senderId_fkey";

-- AlterTable
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "currency" SET DATA TYPE TEXT,
ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Accounts_id_seq";

-- AlterTable
ALTER TABLE "Currencies" DROP CONSTRAINT "Currencies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Currencies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Currencies_id_seq";

-- AlterTable
ALTER TABLE "History" DROP CONSTRAINT "History_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "History_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "History_id_seq";

-- AlterTable
ALTER TABLE "OpenDeals" DROP CONSTRAINT "OpenDeals_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dealerId" SET DATA TYPE TEXT,
ALTER COLUMN "currencyToSellId" SET DATA TYPE TEXT,
ALTER COLUMN "currencyToBuyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OpenDeals_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OpenDeals_id_seq";

-- AlterTable
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reviews_id_seq";

-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "senderId" SET DATA TYPE TEXT,
ALTER COLUMN "reciperId" SET DATA TYPE TEXT,
ALTER COLUMN "currencyId" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transactions_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_currency_fkey" FOREIGN KEY ("currency") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_reciperId_fkey" FOREIGN KEY ("reciperId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenDeals" ADD CONSTRAINT "OpenDeals_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenDeals" ADD CONSTRAINT "OpenDeals_currencyToSellId_fkey" FOREIGN KEY ("currencyToSellId") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenDeals" ADD CONSTRAINT "OpenDeals_currencyToBuyId_fkey" FOREIGN KEY ("currencyToBuyId") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
