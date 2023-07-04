-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "OpenDeals" (
    "id" SERIAL NOT NULL,
    "dealerId" INTEGER NOT NULL,
    "currencyToSellId" INTEGER NOT NULL,
    "currencyToBuyId" INTEGER NOT NULL,

    CONSTRAINT "OpenDeals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenDeals" ADD CONSTRAINT "OpenDeals_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenDeals" ADD CONSTRAINT "OpenDeals_currencyToSellId_fkey" FOREIGN KEY ("currencyToSellId") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenDeals" ADD CONSTRAINT "OpenDeals_currencyToBuyId_fkey" FOREIGN KEY ("currencyToBuyId") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
