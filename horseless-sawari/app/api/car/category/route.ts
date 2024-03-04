import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
/**
 * @swagger
 * /api/car/category:
 *   get:
 *     description: return all the category(manufacture available)
 *     responses:
 *       200:
 *         description: using this in car-hosting-page for adding vehicle manufacture list!
 */
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
