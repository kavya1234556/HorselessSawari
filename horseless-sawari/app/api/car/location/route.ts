import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const location = await db.location.findMany();
    return NextResponse.json(
      { message: 'Location fetched Successfully', location },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Enternal Server error', err },
      { status: 200 }
    );
  }
}
