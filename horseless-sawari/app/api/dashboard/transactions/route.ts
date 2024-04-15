import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const UserTransaction = await db.transaction.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(
      { message: 'Transaction fetch', UserTransaction },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'Transaction fetching Failed' },
      { status: 500 }
    );
  }
}
