import { db } from '@/lib/db';
import React from 'react';
import { Prisma } from '@prisma/client';

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = async ({
  searchParams,
}) => {
  if (searchParams.token) {
    const user = await db.user.findFirst({
      where: {
        emailVerificationToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <div>Invalid token</div>;
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiry: null,
      },
    });

    return (
      <div>
        <h1>
          Email verified for <b>{user.email}</b>!
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Verify Email</h1>
        No email verification token found. Check your email.
      </div>
    );
  }
};

export default VerifyEmailPage;
