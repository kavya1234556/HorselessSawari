'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ReservationPage from './reservation/page';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const url = searchParams.has('url');

  useEffect(() => {
    if (url && session?.data?.user?.role === 'ADMIN') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [url, session?.data?.user?.role]);
  return (
    <>
      <h1>
        {session.data ? <ReservationPage /> : null}
        <div>Card</div>
      </h1>
    </>
  );
}
