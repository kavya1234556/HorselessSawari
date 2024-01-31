/*
  Warnings:

  - Added the required column `profile_image` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('DISEL', 'GAS', 'ELECTRIC');

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "profile_image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "car" (
    "carID" SERIAL NOT NULL,
    "onwerName" TEXT NOT NULL,
    "manufacture" TEXT NOT NULL,
    "registration_num" INTEGER NOT NULL,
    "features" TEXT NOT NULL,
    "no_of_seats" INTEGER NOT NULL,
    "fuel_Type" "FuelType" NOT NULL DEFAULT 'ELECTRIC',
    "color" TEXT NOT NULL,
    "Total_km" DOUBLE PRECISION NOT NULL,
    "insurance_valid_date" TIMESTAMP(3) NOT NULL,
    "pricing_per_hour" INTEGER NOT NULL,
    "pricing_per_four_hour" INTEGER NOT NULL,
    "pricing_per_eight_hour" INTEGER NOT NULL,
    "pricing_per_day" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("carID")
);

-- CreateTable
CREATE TABLE "vehicleImage" (
    "image_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "vehicleImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "blubookImage" (
    "image_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "blubookImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "insuranceImage" (
    "image_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "insuranceImage_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicleImage" ADD CONSTRAINT "vehicleImage_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blubookImage" ADD CONSTRAINT "blubookImage_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insuranceImage" ADD CONSTRAINT "insuranceImage_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;
