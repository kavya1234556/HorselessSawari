/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `booked_car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booked_car" DROP COLUMN "paymentMethod";

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH';
