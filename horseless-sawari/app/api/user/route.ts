import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🚀 ~ file: route.ts:8 ~ POST ~ body:', body);
    const { email, username, password } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User this email already exists' },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User this username already exists' },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: NewUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
