-- AlterTable
ALTER TABLE "booked_car" ADD COLUMN     "is_shared_accepted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "is_shared" SET DEFAULT false;

-- CreateTable
CREATE TABLE "car_shared" (
    "share_car_id" SERIAL NOT NULL,
    "sharind_price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bookedCarID" INTEGER NOT NULL,

    CONSTRAINT "car_shared_pkey" PRIMARY KEY ("share_car_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_shared_bookedCarID_key" ON "car_shared"("bookedCarID");

-- AddForeignKey
ALTER TABLE "car_shared" ADD CONSTRAINT "car_shared_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_shared" ADD CONSTRAINT "car_shared_bookedCarID_fkey" FOREIGN KEY ("bookedCarID") REFERENCES "booked_car"("booked_car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
