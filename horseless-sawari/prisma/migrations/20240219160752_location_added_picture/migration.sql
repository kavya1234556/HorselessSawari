/*
  Warnings:

  - Added the required column `location_image` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "location_image" TEXT NOT NULL;
