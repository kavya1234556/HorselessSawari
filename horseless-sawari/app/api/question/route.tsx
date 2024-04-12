import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const questionData = await db.question.findMany();
    return NextResponse.json(
      { message: 'Questions fetched successfully', questionData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { message: 'Questions fetching not successful', error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const userID = new URL(req.url).searchParams.get('id');
  const body = await req.json();
  const { question } = body;
  console.log('🚀 ~ POST ~ question:', question);
  const NewQuestion = await db.question.create({
    data: {
      question,
      user: {
        connect: { id: Number(userID) },
      },
    },
  });
  return NextResponse.json(
    { message: 'Question created successfully', NewQuestion },
    { status: 200 }
  );
}
