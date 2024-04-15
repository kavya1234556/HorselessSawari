/*
  Warnings:

  - You are about to drop the column `statusb` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "statusb",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOTINTIATED';
