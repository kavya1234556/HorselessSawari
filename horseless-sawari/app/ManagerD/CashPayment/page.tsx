'use client';
import DashboradMLinks from '@/components/dashboardMLinks/page';
import ViewBooking from '@/components/modal/view-booking';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import useGetAllBooking from './hooks/useGetAllBooking';
import useMakeCashPayment from './hooks/useMakeCashPayment';

const CashPaymentPage = () => {
  const [bookData, setBookData] = useState(null);

  const BookingDetail = useGetAllBooking();
  useEffect(() => {
    BookingDetail.then((data) => setBookData(data));
  }, []);

  const ConfirmPayment = (item) => {
    useMakeCashPayment(item);
  };
  return (
    <div className='flex '>
      <div className='w-[25%]'>
        <DashboradMLinks />
      </div>
      <div className='bg-theme w-[75%]'>
        <Table className='m-[10px]'>
          <TableCaption>A list of bookings.</TableCaption>
          <TableHeader className='border border-black'>
            <TableRow>
              <TableHead className='w-[100px] '>S.N</TableHead>
              <TableHead>Booked Car ID</TableHead>
              <TableHead>Pick Up Date</TableHead>
              <TableHead className='text-right'>Drop Off Date</TableHead>
              <TableHead className='text-right'>Total Amount</TableHead>
              <TableHead className='text-right'>Booked by</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border border-black'>
            {bookData?.BookingData?.map((item, index) => (
              <TableRow key={index} className='border border-black'>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell>{item.booked_car_id}</TableCell>
                <TableCell>{item.pickUpDate.split('T')[0]}</TableCell>
                <TableCell className='text-right'>
                  {item.pickUpDate.split('T')[0]}
                </TableCell>
                <TableCell className='text-right'>{item.totalPrice}</TableCell>
                <TableCell className='text-right'>
                  {item.user.username}
                </TableCell>
                <div className=' flex justify-end gap-4 items-center'>
                  <TableCell className='text-right'>
                    <div className='flex gap-3'>
                      <Button onClick={() => ConfirmPayment(item)}>
                        Cash Payment
                      </Button>
                    </div>
                  </TableCell>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CashPaymentPage;
