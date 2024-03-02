'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useGetCarByCarID from './hooks/useGetCarByCarID';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CarImageCarousel from '@/components/ui/ImageCarousel/CarImageCarousel';

const vehiclePage = () => {
  const [carData, setCarData] = useState(null);
  console.log('🚀 ~ vehiclePage ~ carData:', carData);
  const searchParams = useSearchParams();
  const car_id = parseInt(searchParams.get('car_id'));
  console.log('🚀 ~ VehiclePage ~ car_id:', car_id);
  useEffect(() => {
    const carData = useGetCarByCarID(car_id);
    carData.then((data) => {
      setCarData(data);
    });
  }, [searchParams]);
  return (
    <>
      <div className='p-[20px]'>
        {carData?.car_data_final.map((item: any) => (
          <div>
            <h1 className='text-[30px]'>{item.manufacture}</h1>
            <div className='flex w-full'>
              <div className='w-[75%]'>
                <div className='w-full '>
                  <CarImageCarousel itemData={carData?.car_data_final} />
                  {/* <img
                    src={`${item.car_images[0]}`}
                    alt='Car Image'
                    className='w-[90%] max-h-[450px] rounded-lg'
                    style={{ objectFit: 'fill' }}
                  /> */}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Included in the Price</CardTitle>
                    <CardDescription>
                      <div className='flex flex-col'>
                        <label>Free Cancellation</label>
                        <label>Instant Booking</label>
                        <label>Off Road</label>
                        <label>Insurance</label>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{item.features}</CardContent>
                  <CardFooter>
                    <div className='w-[100%] pr-[10px]'>
                      <hr />
                      <p>0 trips</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              <div className='w-[25%]'>
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Information</CardTitle>
                    <CardDescription>
                      <div className='flex flex-col'>
                        <hr />
                        <div className=' flex justify-between'>
                          <label>4 hours:</label>
                          <p>{item.pricing_per_four_hour}</p>
                        </div>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>8 hours:</label>
                            <p>{item.pricing_per_eight_hour}</p>
                          </div>
                        </label>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>1 Day:</label>
                            <p>{item.pricing_per_day}</p>
                          </div>
                        </label>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default vehiclePage;
