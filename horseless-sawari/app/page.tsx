'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReservationPage from './reservation/page';
import Image from 'next/image';

export default function Home() {
  const [locationData, setLocationData] = useState(null);
  const session = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const url = searchParams.has('url');
  useEffect(() => {
    const location_data = async () => {
      const response = await fetch('/api/dashboard/location');
      const data = await response.json();
      return data;
    };
    const data = location_data();
    data.then((loc_data) => {
      if (loc_data) {
        console.log('loc_data', loc_data);
        setLocationData(loc_data);
      }
    });
  }, []);
  useEffect(() => {
    if (url && session?.data?.user?.role === 'ADMIN') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [url, session?.data?.user?.role]);
  return (
    <>
      {/* {session.data ? <ReservationPage /> : null} */}
      <ReservationPage />
      <div className='grid grid-cols-4 gap-4 mx-5'>
        {locationData?.location_data_final?.map((data) => (
          <div className='flex flex-col items-center border border-gray-300 rounded-lg  p-4 mt-8 '>
            <img
              src={`${data.location_image}`}
              alt={data.location_name}
              className='w-full max-w-md rounded-lg'
            />
            <div className='mt-4 text-lg font-bold'>{data.location_name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
