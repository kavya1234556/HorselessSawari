import { db } from '@/lib/db';
import { compare, hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { OldPassword, NewPassword } = body;

  const user_id = new URL(req.url).searchParams.get('id');

  const userData = await db.user.findUnique({
    where: {
      id: Number(user_id),
    },
  });

  if (!userData) {
    return NextResponse.json(
      { user: null, message: 'Account does not exist' },
      { status: 409 }
    );
  }

  const passwordMatch = await compare(OldPassword, userData.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: 'Wrong Old Password ' },
      { status: 409 }
    );
  }

  const NewhashedPassword = await hash(NewPassword, 10);

  await db.user.update({
    where: {
      id: Number(user_id),
    },
    data: {
      password: NewhashedPassword,
    },
  });

  return NextResponse.json(
    { message: 'Password succesfully changed' },
    { status: 201 }
  );
}
