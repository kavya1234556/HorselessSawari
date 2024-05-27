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
    const Category = await db.category.findMany(); //using findMany to find all the category that exists
    return NextResponse.json(
      { message: 'Categories fetched Successfully', Category },
      { status: 200 }
    ); // in success
  } catch (err) {
    return NextResponse.json(
      { message: 'Enternal Server error', err },
      { status: 200 }
    ); //in error
  }
}
