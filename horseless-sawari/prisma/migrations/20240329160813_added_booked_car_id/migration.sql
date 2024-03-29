-- AlterTable
ALTER TABLE "booked_car" ADD COLUMN     "booked_car_id" SERIAL NOT NULL,
ADD CONSTRAINT "booked_car_pkey" PRIMARY KEY ("booked_car_id");
