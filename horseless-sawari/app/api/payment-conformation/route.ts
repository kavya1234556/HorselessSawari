import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const pidx = new URL(req.url).searchParams.get('pidx');
  const bookedCarId = new URL(req.url).searchParams.get('booked_car_id');
  console.log(pidx);
  const user_id = new URL(req.url).searchParams.get('user_id');

  // if (message) {
  //   return res.status(400).json({ message: 'Error processing Khalti payment' });
  // }
  const NewDate = new Date(Date.now());
  try {
    const khaltiResponse = await fetch(
      'https://a.khalti.com/api/v2/epayment/lookup/',
      {
        method: 'POST',
        headers: {
          Authorization: `key ${process.env.KHATLI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pidx,
        }),
      }
    );

    if (!khaltiResponse.ok) {
      throw new Error('Failed to fetch Khalti response');
    }

    const responseData = await khaltiResponse.json();
    if (responseData) {
      await db.transaction.create({
        data: {
          pidx: responseData.pidx,
          total_amount: responseData.total_amount,
          status: responseData.status,
          transaction_id: responseData.transaction_id,
          fee: responseData.fee,
          refunded: responseData.refunded,
          Date: NewDate,
          paymentMethod: 'KHALTI',
          booked_car: {
            connect: { booked_car_id: Number(bookedCarId) },
          },
          user: {
            connect: { id: Number(user_id) },
          },
        },
      });
    }
    return NextResponse.json(
      { message: 'Car added Successfully', responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json(
      { message: 'Failed to initiate Khalti payment' },
      { status: 500 }
    );
  }
}
