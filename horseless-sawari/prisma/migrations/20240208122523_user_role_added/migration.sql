/*
  Warnings:

  - You are about to drop the column `insurance_valid_date` on the `car` table. All the data in the column will be lost.
  - Added the required column `user_role` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "insurance_valid_date",
ADD COLUMN     "user_role" TEXT NOT NULL;
