import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const total_user = await db.user.count();
    return NextResponse.json(
      { message: 'Total Users', total_user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server error', err },
      { status: 500 }
    );
  }
}
