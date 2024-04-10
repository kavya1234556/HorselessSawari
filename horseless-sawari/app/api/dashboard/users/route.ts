import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const AllUsers = await db.user.findMany({
    where: {
      isVerified: true,
      role: 'MANAGER' || 'USER',
    },
  });
  return NextResponse.json(
    { message: 'All users fetched', AllUsers },
    { status: 200 }
  );
}

export async function PATCH(req: Request) {
  try {
    const user_id = new URL(req.url).searchParams.get('id');

    const body = await req.json();
    const newRole = body.role;
    const UdpatedUser = await db.user.update({
      where: {
        id: Number(user_id),
      },
      data: {
        role: newRole,
      },
    });
    return NextResponse.json(
      { message: 'Role Successfully Changed', UdpatedUser },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}
