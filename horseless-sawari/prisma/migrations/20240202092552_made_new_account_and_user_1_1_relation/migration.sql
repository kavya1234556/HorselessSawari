/*
  Warnings:

  - You are about to drop the column `user_id` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropIndex
DROP INDEX "account_user_id_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_accountId_key" ON "user"("accountId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
