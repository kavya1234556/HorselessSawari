-- CreateTable
CREATE TABLE "question" (
    "quest_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("quest_id")
);

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
