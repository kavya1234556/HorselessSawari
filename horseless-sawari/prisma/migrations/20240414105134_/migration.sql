/*
  Warnings:

  - You are about to drop the column `isPaid` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booked_car" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "car" DROP COLUMN "isPaid";
