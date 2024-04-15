-- CreateTable
CREATE TABLE "booked_car" (
    "location_id" INTEGER NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "pickUpTime" TEXT NOT NULL,
    "dropOffDate" TIMESTAMP(3) NOT NULL,
    "dropOffTime" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "ServiceCharge" INTEGER NOT NULL,
    "serviceWithCharge" INTEGER NOT NULL,
    "pickUpLocation" TEXT NOT NULL,
    "dropOffLoction" TEXT NOT NULL,
    "is_shared" BOOLEAN NOT NULL,
    "sharingCharge" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "booked_car_car_id_key" ON "booked_car"("car_id");

-- AddForeignKey
ALTER TABLE "booked_car" ADD CONSTRAINT "booked_car_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booked_car" ADD CONSTRAINT "booked_car_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;
