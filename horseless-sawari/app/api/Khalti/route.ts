import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const paymentData = await req.json();
  try {
    const khaltiResponse = await fetch(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      {
        method: 'POST',
        headers: {
          Authorization: `key ${process.env.KHATLI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      }
    );

    const responseData = await khaltiResponse.json();
    if (res.ok) {
      responseData;
    }
    // res.status(200).json(responseData);
    return NextResponse.json(
      { message: 'Car added Successfully', responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error initiating payment:', error);
    // res.status(500).json({ error: 'Failed to initiate payment' });
  }

  // console.log('1');
  // try {
  //   const paymentData = await req.json();
  //   console.log('PaymentData', paymentData);
  //   console.log(process.env.KHATLI_SECRET_KEY);
  //   const response = await fetch('https://khalti.com/api/v2/payment/verify/', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'process.env.KHATLI_SECRET_KEY',
  //     },
  //     body: JSON.stringify(paymentData),
  //   });
  //   console.log('PaymentData', paymentData);
  //   console.log('response', response);
  //   console.log('1');
  //   if (!response.ok) {
  //     throw new Error('Failed to process payment');
  //   }
  //   if (response.ok) {
  //     const NewResponse = await response.json();
  //     return NextResponse.json(
  //       { message: 'Car added Successfully', NewResponse },
  //       { status: 200 }
  //     );
  //   }
  // } catch (error) {
  //   console.error('Error processing payment:', error);
  //   throw error;
  // }
}
