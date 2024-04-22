'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import { Form } from '../ui/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { useSelector } from 'react-redux';
import generateSharingPrice from '../ui/generateSharingPrce';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from '../ui/use-toast';

const BookingConformation = ({ handleToggleModal, open }) => {
  const router = useRouter();
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;
  console.log(UserId);
  const [isChecked, setIsChecked] = useState(false);
  const [shareCharge, setShareCharge] = useState(0);
  const toggleModal = () => {
    setIsChecked((prev) => !prev);
  };
  const handleCLose = () => {
    handleToggleModal();
    setIsChecked(false);
  };
  const SharingSchema = yup.object().shape({
    sharing: yup.bool(),
  });
  const form = useForm({
    resolver: yupResolver(SharingSchema) as any,
  });
  const payablePrice = useSelector(
    (state: any) => state.booking.value.payablePrice
  );
  const searchParams = useSearchParams();
  const car_id = parseInt(searchParams.get('car_id'));
  useEffect(() => {
    if (isChecked) {
      const { sharingCharge } = generateSharingPrice(payablePrice);
      setShareCharge(sharingCharge);
    } else {
      setShareCharge(0);
    }
  }, [isChecked]);
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
  const totalPrice = useSelector(
    (state: any) => state.booking.value.totalPrice
  );
  const servicePrice = useSelector(
    (state: any) => state.booking.value.servicePrice
  );
  const pickUpLocation = useSelector(
    (state: any) => state.location.value.pickUpLocation
  );
  const dropOffLoction = useSelector(
    (state: any) => state.location.value.dropOffLoction
  );

  const BookingSubmit = async () => {
    console.log('I am clicked');
    try {
      console.log('hello');
      const response = await fetch(`/api/car-booking?car_id=${car_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_shared: isChecked,
          sharingCharge: shareCharge,
          user_id: UserId,
          location_id: location_id,
          pickUpDate: pickUpDate,
          pickUpTime: pickUpTime,
          dropOffDate: dropOffDate,
          dropOffTime: dropOffTime,
          totalPrice: totalPrice,
          ServiceCharge: servicePrice,
          serviceWithCharge: payablePrice,
          pickUpLocation: pickUpLocation,
          dropOffLoction: dropOffLoction,
          car_id: car_id,
        }),
      });
      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Error has occurred',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your car is booked successfully',
        });
        router.push('/');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred in your Profile', error);
    }
  };
  return (
    <Modal
      title='Confrim Booking'
      className='font-bold max-w-[400px] h-[50%]'
      isOpen={open}
      onClose={handleCLose}
    >
      <div>
        <Form {...form}>
          <form>
            <div className='p-[16px]'>
              <div className='flex items-center gap-2 '>
                <Checkbox onClick={toggleModal} />
                <h1>Do you want to share this Ride?</h1>
              </div>
              {isChecked && (
                <h1 className='font-normal'>
                  Sharing Price: {`Rs.${shareCharge}`}{' '}
                </h1>
              )}
              <div>
                <hr className='my-[14px]' />
                <h1 className='font-extrabold text-[28px] text-center'>
                  Book Your Ride
                </h1>
                <div className='flex justify-center'>
                  <Button type='button' onClick={BookingSubmit}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default BookingConformation;
