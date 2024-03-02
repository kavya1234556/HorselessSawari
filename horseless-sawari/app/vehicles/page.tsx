'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useGetCarByLocation from './hooks/useGetCarByLocation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BookingCard from '@/components/bookingCard';

const VehiclesPage = () => {
  const router = useRouter();
  const [locationData, setLocationData] = useState(null);
  console.log('🚀 ~ VehiclesPage ~ locationData:', locationData);

  const searchParams = useSearchParams();
  const location_id = parseInt(searchParams.get('location_id'));
  console.log('🚀 ~ VehiclesPage ~ location_id:', location_id);
  useEffect(() => {
    const locationData = useGetCarByLocation(location_id);
    locationData.then((data) => {
      setLocationData(data);
    });
  }, [searchParams]);
  return (
    <>
      <div className='w-[95%] m-auto bg-white1 p-[15px]'>
        <BookingCard />
      </div>
      <div className='flex w-[100%]'>
        <div className='w-[25%] bg-theme my-[15px] p-[18px] mx-[35px]'>
          <h2 className='text-left text-[20px]  font-medium'>Filters</h2>
          <p>Vehicle Type</p>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-4'>
          {locationData?.car_data_final.map((item: any) => (
            <div
              onClick={() => {
                router.push(`/vehicle?car_id=${item.carID}`);
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{item.manufacture}</CardTitle>
                  <CardDescription>
                    <img
                      src={`${item.car_images[0]}`}
                      alt='Car Image'
                      className='w-full max-w-md rounded-lg'
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <div className='w-[100%] pr-[10px]'>
                    <hr />
                    <p className='text-right'>{`${item.pricing_per_day} per/Day`}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VehiclesPage;
