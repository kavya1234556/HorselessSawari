'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import useGetSharingDetail from './hooks/useGetSharingDetail';
import { Button } from '@/components/ui/button';

const CarpoolPage = () => {
  const [shareData, setShareData] = useState(null);
  console.log(shareData, 'Share Data');
  useEffect(() => {
    const SharingData = useGetSharingDetail();
    SharingData.then((data) => {
      setShareData(data);
    });
  }, []);

  return (
    <div className='bg-theme p-[20px]'>
      <div className='py-[30px]'>
        <h1 className=' font-semi-bold text-center text-[38px] '>
          "Seamless Travel,Where Rides Meet Ease!"
        </h1>
        <h2 className='font-bold text-center text-[48px]'>Rental Sawari</h2>
        <h3 className='text-center text-[18px] font-medium'>
          "Drive Greener, Save Green: Carpool with Rental Sawari for Cleaner Air
          and Clearer Roads!"
        </h3>
      </div>
      <h1 className='text-[18px] font-medium'>Carpool Request</h1>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        {shareData?.share_car_data?.map((item) => (
          <Card>
            <CardHeader>
              <CardDescription>
                <img
                  src={`${item.car_images[0]}`}
                  alt='Car Image'
                  className='w-full rounded-lg'
                />
              </CardDescription>
              {/* <CardTitle className='pt-[14px]'>{item.location_id}</CardTitle> */}
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <p>
                  <span className='font-medium'> Pick Up Date:</span>
                  {item.pickUpDate.split('T')[0]}
                </p>
                <p>
                  <span className='font-medium'> Drop Off Date:</span>
                  {item.dropOffDate.split('T')[0]}
                </p>
                <p>
                  <span className='font-medium'> Pick Up Location:</span>{' '}
                  {item.pickUpLocation}
                </p>
                <p>
                  {' '}
                  <span className='font-medium'> Drop Off Location:</span>{' '}
                  {item.dropOffLoction}
                </p>
              </div>
            </CardContent>
            <CardContent>
              <hr />
              <div className='flex flex-col gap-2 mt-3'>
                <p>
                  <span className='font-medium'> Pick Up Time: </span>
                  {item.pickUpTime}
                </p>
                <p>
                  <span className='font-medium'> Drop Off Time: </span>
                  {item.dropOffTime}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className='w-[100%] pr-[10px] '>
                <hr />
                <p className='pt-[15px] '>
                  <span className='font-medium'> Charge: </span>
                  {item.sharingCharge}
                </p>
              </div>
            </CardFooter>
            <div className='flex justify-end p-[20px]'>
              <Button>Accept</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarpoolPage;