export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get('user_id');
    if (!userId) {
      throw new Error('User ID is missing');
    }

    const transactions = await db.transaction.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    return NextResponse.json(
      { message: 'Transaction details', transactions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error while fetching transaction:', error);
    return NextResponse.json(
      { message: 'Error while fetching transaction' },
      { status: 500 }
    );
  }
}
