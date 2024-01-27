import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();
  const { token } = body;
  console.log('🚀 ~ POST ~ token:', token);

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await db.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: new Date(), // Check if resetTokenExpiry is greater than the current date
      },
    },
  });
  console.log('User:', user);

  if (!user) {
    return NextResponse.json('Invalid Token or has Expired', { status: 400 });
  }
  return new NextResponse(JSON.stringify(user), { status: 200 });
}
