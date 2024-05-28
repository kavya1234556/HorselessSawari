'use client';

import Hero from '@/components/hero/hero';
import CategoryImageCarousel from '@/components/ui/ImageCarousel/CategoryImageCarousel';
import LocationImageCarousel from '@/components/ui/ImageCarousel/LocationImageCarousel';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReservationPage from './reservation/page';

export default function Home() {
  const [locationData, setLocationData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const session = useSession(); //client side session
  const router = useRouter(); //to navigate the user to a certain page

  const searchParams = useSearchParams();
  const url = searchParams.has('url'); //return if the url is present or not in boolean
  useEffect(() => {
    const location_data = async () => {
      const response = await fetch('/api/dashboard/location');
      const data = await response.json();
      return data;
    };
    const data = location_data();
    data.then((loc_data) => {
      if (loc_data) {
        setLocationData(loc_data);
      } //resolving the promise
    }); //only runs ones when the project is run once and the value is set yo setLocationData

    const category_data = async () => {
      const response = await fetch('/api/manufacture');
      const data = await response.json();
      return data;
    };

    const CData = category_data();
    CData.then((cat_data) => {
      if (cat_data) {
        setCategoryData(cat_data);
      }
    });
  }, []);
  useEffect(() => {
    if (url && session?.data?.user?.role === 'ADMIN') {
      router.push('/dashboard');
    } else if (url && session?.data?.user?.role === 'MANAGER') {
      router.push('/ManagerD');
    } else {
      router.push('/');
    }
  }, [url, session?.data?.user?.role]); //redirecting the user to thier homepage according to their role
  return (
    <>
      <ReservationPage />
      {/* for the booking card where can input the pickup-date... */}
      <div className='bg-gray pb-20'>
        <div className='flex flex-col items-center pt-10 px-4 '>
          <h1 className='text-2xl font-semibold text-center sm:text-left sm:mr-4'>
            Find rental cars based on destination.
          </h1>
          <p className='text-sm sm:text-[18px] pt-[0px] sm:pt-[10px] text-center sm:text-left'>
            Discover car rental options in Nepal, always offering the perfect
            price for you.
          </p>
        </div>
        {/* <div className='grid grid-cols-4 gap-4 mx-10'> */}
        <div className='items-center border border-gray-300 rounded-lg  p-4 mt-8 mx-10'>
          <LocationImageCarousel itemData={locationData?.location_data_final} />
          {/* location slider */}
        </div>
      </div>
      <Hero />
      {/* Hero section contains static details about the application */}
      <div className='bg-gray pb-20 '>
        <div className='flex flex-col items-center pt-10 px-4 '>
          <h1 className='text-2xl font-semibold text-center sm:text-left sm:mr-4'>
            Find rental cars based on Category.
          </h1>
          <p className='text-sm sm:text-[18px] pt-[0px] sm:pt-[10px] text-center sm:text-left'>
            Discover car rental options in Nepal, always offering the perfect
            price for you.
          </p>
        </div>
        {/* <div className='grid grid-cols-4 gap-4 mx-10'> */}
        <div className='items-center border border-gray-300 rounded-lg  p-4 mt-8 mx-10'>
          <CategoryImageCarousel itemData={categoryData?.category_data_final} />
          {/* location slider */}
        </div>
      </div>
    </>
  );
}
