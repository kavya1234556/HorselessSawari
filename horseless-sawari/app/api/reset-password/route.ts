import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hash } from 'bcrypt';

export async function PUT(req: Request) {
  const body = await req.json();
  const { password, email } = body;
  const hashedPassword = await hash(password, 10);

  await db.user.update({
    where: { email: email },
    data: {
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpiry: undefined,
    },
  });
  try {
    return NextResponse.json(
      { message: 'Password Changed Successfully' },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(err, { status: 400 });
  }
}
