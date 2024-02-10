/*
  Warnings:

  - You are about to drop the `blubookImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insuranceImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicleImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `car` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "blubookImage" DROP CONSTRAINT "blubookImage_car_id_fkey";

-- DropForeignKey
ALTER TABLE "insuranceImage" DROP CONSTRAINT "insuranceImage_car_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicleImage" DROP CONSTRAINT "vehicleImage_car_id_fkey";

-- AlterTable
ALTER TABLE "car" ADD COLUMN     "bluebook_img" TEXT[],
ADD COLUMN     "car_images" TEXT[],
ADD COLUMN     "insurance_img" TEXT[];

-- DropTable
DROP TABLE "blubookImage";

-- DropTable
DROP TABLE "insuranceImage";

-- DropTable
DROP TABLE "vehicleImage";

-- CreateIndex
CREATE UNIQUE INDEX "account_phone_number_key" ON "account"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "car_user_id_key" ON "car"("user_id");
