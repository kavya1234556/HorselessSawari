/*
  Warnings:

  - You are about to drop the column `status` on the `booked_car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booked_car" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "transaction" (
    "pidx" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "statusb" "Status" NOT NULL DEFAULT 'NOTINTIATED',
    "transaction_id" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "refunded" BOOLEAN NOT NULL DEFAULT false,
    "bookedCarId" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("pidx")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transaction_id_key" ON "transaction"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_bookedCarId_key" ON "transaction"("bookedCarId");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_bookedCarId_fkey" FOREIGN KEY ("bookedCarId") REFERENCES "booked_car"("booked_car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
