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
import { useSelector } from 'react-redux';
import DateFormatter from '@/components/ui/DateFormatter';

const vehiclePage = () => {
  const [carData, setCarData] = useState(null);
  const searchParams = useSearchParams();
  const car_id = parseInt(searchParams.get('car_id'));
  useEffect(() => {
    const carData = useGetCarByCarID(car_id);
    carData.then((data) => {
      setCarData(data);
    });
  }, [searchParams]);
  const location_id = useSelector(
    (state: any) => state.booking.value.location_id
  );
  const pickUpDate = useSelector(
    (state: any) => state.booking.value.pickUpDate
  );
  console.log('pickUpdate', pickUpDate);

  const pickUpTime = useSelector(
    (state: any) => state.booking.value.pickUpTime
  );
  const dropOffDate = useSelector(
    (state: any) => state.booking.value.dropOffDate
  );
  console.log('dropOffDate', dropOffDate);
  const dropOffTime = useSelector(
    (state: any) => state.booking.value.dropOffTime
  );

  const calculateHours = (pickUpTime, dropOffTime) => {
    var today = new Date().toISOString().slice(0, 10);

    // Concatenate today's date with pickUpTime and dropOffTime strings
    var pickupDateTimeString = today + 'T' + pickUpTime + ':00';
    var dropoffDateTimeString = today + 'T' + dropOffTime + ':00';

    // Parse the date/time strings into Date objects
    var pickupDateTime = new Date(pickupDateTimeString);
    var dropoffDateTime = new Date(dropoffDateTimeString);

    console.log('pickupDateTime:', pickupDateTime);
    console.log('dropoffDateTime:', dropoffDateTime);

    if (pickupDateTime > dropoffDateTime) {
      var temp = pickupDateTime;
      pickupDateTime = dropoffDateTime;
      dropoffDateTime = temp;
    }

    var differenceMs = dropoffDateTime.getTime() - pickupDateTime.getTime();
    var totalHours = differenceMs / (1000 * 60 * 60);

    if (pickupDateTime < dropoffDateTime) {
      totalHours += 12;
    }

    return totalHours;
  };

  const result = calculateHours(pickUpTime, dropOffTime);
  console.log('result', result);
  return (
    <>
      <div className='ml-[20px] p-[20px]'>
        {carData?.car_data_final.map((item: any) => (
          <div>
            <h1 className='text-[30px]'>{item.manufacture}</h1>
            <div className='flex w-full gap-4'>
              <div className='w-[65%]'>
                <div className='w-[100%] '>
                  <CarImageCarousel itemData={carData?.car_data_final} />
                </div>
                <Card className='w-[95%]'>
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
              <div className='w-[35%]  '>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Information</CardTitle>
                      <CardDescription className='flex flex-col gap-4'>
                        <hr />
                        <div className=' flex justify-between '>
                          <label>4 hours</label>
                          <p>{item.pricing_per_four_hour}</p>
                        </div>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>8 hours</label>
                            <p>{item.pricing_per_eight_hour}</p>
                          </div>
                        </label>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>1 Day</label>
                            <p>{item.pricing_per_day}</p>
                          </div>
                        </label>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className='mt-[20px]'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Detail</CardTitle>
                      <CardDescription className='flex flex-col gap-4'>
                        <hr />
                        <div className=' flex justify-between'>
                          <label>City</label>
                          <p>{location_id}</p>
                        </div>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>Pickup Date</label>
                            <div className='flex gap-2'>
                              <DateFormatter date={pickUpDate} />
                              {pickUpTime}
                            </div>
                          </div>
                        </label>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>DropOff Date</label>
                            <div className='flex gap-2'>
                              <DateFormatter date={dropOffDate} />
                              {dropOffTime}
                            </div>
                          </div>
                        </label>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default vehiclePage;
