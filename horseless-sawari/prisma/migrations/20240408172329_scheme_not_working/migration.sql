-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'KHALTI');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOTINTIATED', 'INITIATED', 'PENDING', 'COMPLETED', 'REFUNDED', 'EXPIRED', 'CANCELED');

-- AlterTable
ALTER TABLE "booked_car" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH',
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOTINTIATED';
