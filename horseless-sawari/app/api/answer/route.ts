import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const questionID = new URL(req.url).searchParams.get('id');
  const body = await req.json();
  const { answer } = body;
  console.log('🚀 ~ POST ~ question:', answer);
  const NewAnswer = await db.answer.create({
    data: {
      answer,
      question: {
        connect: { quest_id: Number(questionID) },
      },
    },
  });
  return NextResponse.json(
    { message: 'Question created successfully', NewAnswer },
    { status: 200 }
  );
}
