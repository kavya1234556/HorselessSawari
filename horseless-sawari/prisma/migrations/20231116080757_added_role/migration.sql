-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" DEFAULT 'USER';
