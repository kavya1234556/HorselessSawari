-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_category_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_location_id_fkey";

-- DropForeignKey
ALTER TABLE "car_shared" DROP CONSTRAINT "car_shared_bookedCarID_fkey";

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_shared" ADD CONSTRAINT "car_shared_bookedCarID_fkey" FOREIGN KEY ("bookedCarID") REFERENCES "booked_car"("booked_car_id") ON DELETE CASCADE ON UPDATE CASCADE;
