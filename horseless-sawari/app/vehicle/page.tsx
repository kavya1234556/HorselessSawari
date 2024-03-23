'use client';
import DateFormatter from '@/components/ui/DateFormatter';
import CarImageCarousel from '@/components/ui/ImageCarousel/CarImageCarousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import generatePrice from '@/components/ui/generatePrice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetCarByCarID from './hooks/useGetCarByCarID';
import { Button } from '@/components/ui/button';
import Maps from '@/components/Maps';
import PickSearchBox from '@/components/PickSearchBox';
import DropSearchBox from '@/components/DropSearchBox';

export interface IBookingType {
  pickUpLocation: string;
  dropOffLocation: string;
}

const vehiclePage = () => {
  const [carData, setCarData] = useState(null);
  const [pickUpSelectPostion, setPickUpSelectedPosition] = useState(null);
  console.log('🚀 ~ vehiclePage ~ pickUpSelectPostion:', pickUpSelectPostion);

  const [selectPostion, setSelectedPosition] = useState(null);

  console.log('🚀 ~ vehiclePage ~ selectPostion:', selectPostion);

  const pricing = [];

  carData?.car_data_final.map((item: any) => {
    pricing.push(item.pricing_per_four_hour);
    pricing.push(item.pricing_per_eight_hour);
    pricing.push(item.pricing_per_day);
  });
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

  const pickUpTime = useSelector(
    (state: any) => state.booking.value.pickUpTime
  );
  const dropOffDate = useSelector(
    (state: any) => state.booking.value.dropOffDate
  );
  const dropOffTime = useSelector(
    (state: any) => state.booking.value.dropOffTime
  );
  function formatDate(dateString) {
    const date = new Date(dateString);
    const isoDate = date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD

    return isoDate;
  }
  function formatTime(timeString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours);

    if (period === 'PM' && formattedHours < 12) {
      formattedHours += 12;
    } else if (period === 'AM' && formattedHours === 12) {
      formattedHours = 0;
    }

    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, '0')}:${minutes}`;

    return formattedTime;
  }
  const pickUPDate = formatDate(pickUpDate);
  const dropOFFDate = formatDate(dropOffDate);
  const pickUPTime = formatTime(pickUpTime);
  const dropOFFTime = formatTime(dropOffTime);

  const { totalPrice, ServiceCharge, serviceWithCharge } = generatePrice(
    pickUPDate,
    pickUPTime,
    dropOFFDate,
    dropOFFTime,
    pricing
  );

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
                  {/* <CardFooter>
                      <div className='w-[100%] pr-[10px]'>
                        <hr />
                        <p>0 trips</p>
                      </div>
                    </CardFooter> */}
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
                <div className='mt-[40px]'>
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
                <div className='mt-[40px]'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Summary </CardTitle>
                      <CardDescription className='flex flex-col gap-4'>
                        <hr />
                        <div className=' flex justify-between '>
                          <label>Total Amount </label>
                          <p>{totalPrice}</p>
                        </div>
                        <label>
                          <hr />
                          <div className=' flex justify-between '>
                            <label>Service Amount </label>
                            <p>{ServiceCharge}</p>
                          </div>
                        </label>
                        <label>
                          <hr />
                          <div className=' flex justify-between'>
                            <label>Payable Amount</label>
                            <p>{serviceWithCharge}</p>
                          </div>
                        </label>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
            <div className='mt-[40px]'>
              <Card>
                <CardContent>
                  <div className='grid grid-cols-2  gap-[40px] pt-[15px]'>
                    <PickSearchBox
                      selectPostion={pickUpSelectPostion}
                      setSelectedPosition={setPickUpSelectedPosition}
                    />
                    <DropSearchBox
                      selectPostion={selectPostion}
                      setSelectedPosition={setSelectedPosition}
                    />
                  </div>
                  <div
                    className='w-[100%] h-[250px]'
                    style={{ border: '2px solid black', marginTop: '40px' }}
                  >
                    <Maps
                      selectPostion={
                        selectPostion ? selectPostion : pickUpSelectPostion
                      }
                    />
                  </div>
                  <div className='flex justify-end mt-[20px]'>
                    <Button className='w-[186px]'>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default vehiclePage;
