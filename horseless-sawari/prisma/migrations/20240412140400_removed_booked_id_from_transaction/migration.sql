/*
  Warnings:

  - You are about to drop the column `bookedCarId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_bookedCarId_fkey";

-- DropIndex
DROP INDEX "transaction_bookedCarId_key";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "bookedCarId";
