/*
  Warnings:

  - You are about to drop the column `isPaid` on the `booked_car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookedCarID]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookedCarID` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booked_car" DROP COLUMN "isPaid";

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "bookedCarID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "transaction_bookedCarID_key" ON "transaction"("bookedCarID");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_bookedCarID_fkey" FOREIGN KEY ("bookedCarID") REFERENCES "booked_car"("booked_car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
