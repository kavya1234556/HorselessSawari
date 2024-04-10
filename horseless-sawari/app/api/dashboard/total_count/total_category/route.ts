import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const category_count = await db.category.count();
    return NextResponse.json(
      { message: 'Total Category', category_count },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server error', err },
      { status: 500 }
    );
  }
}
