import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const transaction_count = await db.transaction.count();
    return NextResponse.json(
      { message: 'Total Transactios', transaction_count },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server error', err },
      { status: 500 }
    );
  }
}
