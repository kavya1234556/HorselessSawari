import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const AllData = await db.question.findMany({
      include: {
        answer: true,
      },
    });
    return NextResponse.json(
      { message: 'Question and Answer fetch successfully', AllData },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'Internal Server Error', e },
      { status: 500 }
    );
  }
}
