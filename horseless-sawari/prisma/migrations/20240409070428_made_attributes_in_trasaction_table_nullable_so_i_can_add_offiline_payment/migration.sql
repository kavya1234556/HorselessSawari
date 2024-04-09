/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[pidx]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "transaction_transaction_id_key";

-- AlterTable
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_pkey",
ALTER COLUMN "pidx" DROP NOT NULL,
ALTER COLUMN "fee" DROP NOT NULL,
ALTER COLUMN "refunded" DROP NOT NULL,
ADD CONSTRAINT "transaction_pkey" PRIMARY KEY ("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_pidx_key" ON "transaction"("pidx");
