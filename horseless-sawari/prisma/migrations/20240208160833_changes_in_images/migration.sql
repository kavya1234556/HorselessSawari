/*
  Warnings:

  - The `bluebook_image` column on the `bluebook_image` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `car_image` column on the `car_image` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `insurance_image` column on the `insurance_image` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "bluebook_image" DROP COLUMN "bluebook_image",
ADD COLUMN     "bluebook_image" TEXT[];

-- AlterTable
ALTER TABLE "car_image" DROP COLUMN "car_image",
ADD COLUMN     "car_image" TEXT[];

-- AlterTable
ALTER TABLE "insurance_image" DROP COLUMN "insurance_image",
ADD COLUMN     "insurance_image" TEXT[];
