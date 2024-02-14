/*
  Warnings:

  - Added the required column `location_id` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_name` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD COLUMN     "location_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
