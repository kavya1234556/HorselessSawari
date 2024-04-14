import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const pidx = new URL(req.url).searchParams.get('pidx');
  console.log(pidx);
  const user_id = new URL(req.url).searchParams.get('user_id');
  const car_booking_id = new URL(req.url).searchParams.get('bookId');
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
    console.log('🚀 ~ POST ~ responseData:', responseData);
    await db.transaction.create({
      data: {
        pidx: responseData.pidx,
        total_amount: responseData.total_amount,
        status: responseData.status,
        transaction_id: responseData.transaction_id,
        fee: responseData.fee,
        refunded: responseData.refunded,
        Date: new Date(), // Use current date
        paymentMethod: 'KHALTI',
        user: { connect: { id: Number(user_id) } },
        booked_car: { connect: { booked_car_id: Number(car_booking_id) } },
      },
    });

    await db.booked_car.update({
      where: { booked_car_id: Number(car_booking_id) },
      data: { isPaid: true },
    });
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
