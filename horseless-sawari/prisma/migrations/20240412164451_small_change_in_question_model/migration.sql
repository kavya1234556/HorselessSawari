-- AlterTable
CREATE SEQUENCE question_quest_id_seq;
ALTER TABLE "question" ALTER COLUMN "quest_id" SET DEFAULT nextval('question_quest_id_seq');
ALTER SEQUENCE question_quest_id_seq OWNED BY "question"."quest_id";
