import { db } from '@/lib/db';
import React from 'react';
import { Prisma } from '@prisma/client';
import Image from 'next/image';

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
      <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center'>
          <h3 className='text-3xl text-gray-800 font-semibold mb-4'>
            Thank you for your time!
          </h3>
          <p className='text-gray-600'>
            Your Account <span className='text-blue-500'>{user.email} </span>{' '}
            has Been verified.
          </p>
          <div className='flex justify-center'>
            <Image
              width={100}
              height={100}
              src='/images/success.png'
              alt=' Successfull Image'
              className='object-contain max-w-full h-auto'
            />
          </div>
        </div>
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
