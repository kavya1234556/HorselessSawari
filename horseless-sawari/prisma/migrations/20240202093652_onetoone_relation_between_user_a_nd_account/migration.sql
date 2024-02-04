/*
  Warnings:

  - You are about to drop the column `accountId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_accountId_fkey";

-- DropIndex
DROP INDEX "user_accountId_key";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "accountId";

-- CreateIndex
CREATE UNIQUE INDEX "account_user_id_key" ON "account"("user_id");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
