'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReservationPage from './reservation/page';
import LocationImageCarousel from '@/components/ui/ImageCarousel/LocationImageCarousel';
import Hero from '@/components/hero/hero';

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
      <div className='bg-gray pb-20'>
        <div className='flex items-center flex-col pt-10'>
          <h1 className='text-[24px] font-semibold'>
            Find rental cars based on destination.
          </h1>
          <p>
            Discover car rental options in Nepal, always offering the perfect
            price for you.
          </p>
        </div>
        {/* <div className='grid grid-cols-4 gap-4 mx-10'> */}
        <div className='items-center border border-gray-300 rounded-lg  p-4 mt-8 mx-10'>
          <LocationImageCarousel itemData={locationData?.location_data_final} />
        </div>
      </div>
      <Hero />
    </>
  );
}
