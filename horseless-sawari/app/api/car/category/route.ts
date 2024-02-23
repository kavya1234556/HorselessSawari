import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const Category = await db.category.findMany();
    return NextResponse.json(
      { message: 'Categories fetched Successfully', Category },
      { status: 200 }
    );
  } catch (err) {
    console.log('err', err);
  }
}
