import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const questionID = new URL(req.url).searchParams.get('id'); //getting the user through the url
  const body = await req.json();
  const { answer } = body; //getting the answer input from user
  console.log('🚀 ~ POST ~ question:', answer);
  const NewAnswer = await db.answer.create({
    data: {
      answer,
      question: {
        connect: { quest_id: Number(questionID) },
      },
    },
  }); //adding the answer in the answer table connected with the foreign key question
  return NextResponse.json(
    { message: 'Answer submitted successfully', NewAnswer },
    { status: 200 }
  ); //in success
}
