import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const user_id = new URL(req.url).searchParams.get('id');
    const accountDetails = await db.account.findUnique({
      where: {
        user_id: Number(user_id),
      },
    });

    if (!accountDetails) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Account retrieved successfully', accountDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
