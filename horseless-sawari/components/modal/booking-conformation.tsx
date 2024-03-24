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

const BookingConformation = ({ handleToggleModal, open }) => {
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
  useEffect(() => {
    if (isChecked) {
      const { sharingCharge } = generateSharingPrice(payablePrice);
      setShareCharge(sharingCharge);
    } else {
      setShareCharge(0);
    }
  }, [isChecked]);
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
                  <Button>Book Now</Button>
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
