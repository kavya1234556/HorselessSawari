/*
  Warnings:

  - Changed the type of `insurance_valid_date` on the `car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "insurance_valid_date",
ADD COLUMN     "insurance_valid_date" INTEGER NOT NULL;
