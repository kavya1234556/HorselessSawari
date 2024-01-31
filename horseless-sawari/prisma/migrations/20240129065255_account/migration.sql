-- CreateTable
CREATE TABLE "account" (
    "acc_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("acc_id")
);

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
