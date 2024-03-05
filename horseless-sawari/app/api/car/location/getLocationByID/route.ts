import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const id = new URL(req.url).searchParams.get('id');
    const location_detail = await db.location.findUnique({
      where: {
        location_id: Number(id),
      },
    });
    return NextResponse.json(
      { message: 'Location by ID fetched Successfully', location_detail },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'An error occurred', error: err.message },
      { status: 500 }
    );
  }
}
