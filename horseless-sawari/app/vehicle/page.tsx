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
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetCarByCarID from './hooks/useGetCarByCarID';
import { Button } from '@/components/ui/button';
import PickSearchBox from '@/components/PickSearchBox';
import DropSearchBox from '@/components/DropSearchBox';
import { useDispatch } from 'react-redux';
import {
  setdropOffLoction,
  setpickUpLocation,
} from '@/redux/reducers/location';
import BookingConformation from '@/components/modal/booking-conformation';
import {
  setPayablePrice,
  setServicePrice,
  setTotalPrice,
} from '@/redux/reducers/booking';
import dynamic from 'next/dynamic';
import ReactPaginate from 'react-paginate';
import '@/app/pagination.css';

const DynamicMap = dynamic(() => import('@/components/Maps'), {
  ssr: false,
});

export interface IBookingType {
  pickUpLocation: string;
  dropOffLocation: string;
}

const VehiclePage = () => {
  const router = useRouter();
  const dispatch = useDispatch(); //for setting value in the state
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState(null);
  const [pickUpSelectPostion, setPickUpSelectedPosition] = useState(null);
  const [selectPostion, setSelectedPosition] = useState(null);
  const car_id = parseInt(searchParams.get('car_id')); //getting the car_id form the url
  const carDatas = useGetCarByCarID(car_id); //fetching value from the hook

  useEffect(() => {
    carDatas.then((data) => {
      setCarData(data);
    });
  }, [searchParams]); //this use state runs when the car_id changes
  dispatch(setpickUpLocation(pickUpSelectPostion?.display_name));
  dispatch(setdropOffLoction(selectPostion?.display_name));
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;
  //getting the value from the local storage
  const pricing = []; //empty array for storing the pricing

  carData?.car_data_final.map((item: any) => {
    pricing.push(item.pricing_per_four_hour);
    pricing.push(item.pricing_per_eight_hour);
    pricing.push(item.pricing_per_day);
  });
  //setting the pricing value in the pricing array
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
  ); //getting the initial value of the state from the booking reducer

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    const isoDate = date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
    return isoDate;
  } //function for converting the date into iso format

  function formatTime(timeString: any) {
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
  } //formating the time to acceptable time format
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
  console.log(serviceWithCharge); //generate price is self definef function which calculates the price for the user

  dispatch(setPayablePrice(serviceWithCharge));
  dispatch(setTotalPrice(totalPrice));
  dispatch(setServicePrice(ServiceCharge));
  //setting the value in the
  const toggleModal = () => {
    isNaN(UserId) ? router.push('/login') : setOpen((prev) => !prev);
    isNaN(totalPrice);
  };

  return (
    <>
      <div className='ml-[20px] p-[20px]'>
        {carData?.car_data_final.map((item: any, index) => (
          <div key={index}>
            <h1 className='text-[30px]'>{item.manufacture}</h1>
            <div className='flex flex-col md:flex-row w-full gap-4'>
              <div className='md:w-[65%]'>
                <div className='w-full'>
                  <CarImageCarousel itemData={carData?.car_data_final} />
                </div>
                <Card className='w-full md:w-[95%]'>
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
                </Card>
              </div>
              <div className='md:w-[35%]'>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Information</CardTitle>
                      <CardDescription className='flex flex-col gap-4'>
                        <hr />
                        <div className='flex justify-between'>
                          <label>4 hours</label>
                          <p>{item.pricing_per_four_hour}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <label>8 hours</label>
                          <p>{item.pricing_per_eight_hour}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <label>1 Day</label>
                          <p>{item.pricing_per_day}</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className='mt-10'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Detail</CardTitle>
                      <CardDescription className='flex flex-col gap-4'>
                        <hr />
                        <div className='flex justify-between'>
                          <label>City</label>
                          <p>{location_id}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <label>Pickup Date</label>
                          <div className='flex gap-2'>
                            <DateFormatter date={pickUpDate} />
                            {pickUpTime}
                          </div>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <label>DropOff Date</label>
                          <div className='flex gap-2'>
                            <DateFormatter date={dropOffDate} />
                            {dropOffTime}
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className='mt-10'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Summary</CardTitle>
                      <CardDescription className='flex flex-col gap-4'>
                        <hr />
                        <div className='flex justify-between'>
                          <label>Total Amount</label>
                          <p>{totalPrice}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <label>Service Amount</label>
                          <p>{ServiceCharge}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                          <label>Payable Amount</label>
                          <p>{serviceWithCharge}</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <Card>
                <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
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
                    className='w-full h-[250px] mt-4'
                    style={{
                      border: '2px solid black',
                      position: 'relative',
                      zIndex: 30,
                    }}
                  >
                    <DynamicMap
                      selectPosition={selectPostion}
                      pickUpPosition={pickUpSelectPostion}
                    />
                  </div>
                  <div className='flex justify-end mt-4'>
                    <Button
                      onClick={toggleModal}
                      className='w-48'
                      disabled={!pickUpSelectPostion || !selectPostion}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <BookingConformation open={open} handleToggleModal={toggleModal} />
            {/* booking conformation */}
          </div>
        ))}
      </div>
    </>
  );
};

export default VehiclePage;
