/*
  Warnings:

  - You are about to drop the column `bluebook_img` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `car_images` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `insurance_img` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "bluebook_img",
DROP COLUMN "car_images",
DROP COLUMN "insurance_img";

-- CreateTable
CREATE TABLE "car_image" (
    "car_image_id" SERIAL NOT NULL,
    "car_image" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "car_image_pkey" PRIMARY KEY ("car_image_id")
);

-- CreateTable
CREATE TABLE "bluebook_image" (
    "bluebook_image_id" SERIAL NOT NULL,
    "bluebook_image" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "bluebook_image_pkey" PRIMARY KEY ("bluebook_image_id")
);

-- CreateTable
CREATE TABLE "insurance_image" (
    "insurance_image_id" SERIAL NOT NULL,
    "insurance_image" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "insurance_image_pkey" PRIMARY KEY ("insurance_image_id")
);

-- AddForeignKey
ALTER TABLE "car_image" ADD CONSTRAINT "car_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bluebook_image" ADD CONSTRAINT "bluebook_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_image" ADD CONSTRAINT "insurance_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;
