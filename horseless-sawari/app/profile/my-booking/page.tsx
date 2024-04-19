'use client';
import { IoEyeOutline } from 'react-icons/io5';
import ProfileLinks from '@/components/profileLinks';
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
import useGetUserBooking from './hooks/useGetUserBooking';
import { Button } from '@/components/ui/button';
import ViewBooking from '@/components/modal/view-booking';
import DeleteModal from '@/components/modal/delete-modal';
import useDeleteBooking from './hooks/useDeleteBooking';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const MyBookingPage = () => {
  const router = useRouter();
  const [bookData, setBookData] = useState(null);
  console.log('🚀 ~ MyBookingPage ~ bookData:', bookData);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const account_id = useSelector((state: any) => state.account.value.acc_id);
  const phoneNumber = useSelector(
    (state: any) => state.account.value.phone_number
  );
  const name = useSelector((state: any) => state.account.value.first_name);
  console.log('🚀 ~ MyBookingPage ~ account_id:', account_id);
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;

  const email =
    typeof window !== 'undefined' && localStorage
      ? localStorage.getItem('email')
      : null;

  const BookingDetail = useGetUserBooking(UserId);
  useEffect(() => {
    BookingDetail.then((data) => setBookData(data));
  }, [UserId]);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  function handleDeleteModalToggle() {
    setDeleteOpen((prev) => !prev);
  }
  function HandleDeleteOffers(item) {
    useDeleteBooking(item.booked_car_id);
    handleDeleteModalToggle();
    window.location.reload();
  }

  const confirmPayment = async (item: any) => {
    console.log('hello', item.booked_car_id);
    if (account_id === 0) {
      router.push('/profile');
      return; // End function execution early if account_id is 0
    }

    const payload = {
      return_url: 'http://localhost:3000/success',
      website_url: 'http://localhost:3000/',
      amount: item.totalPrice,
      purchase_order_id: item.booked_car_id,
      purchase_order_name: String(item.registration_num),
      customer_info: {
        name: name,
        email: email,
        phone: phoneNumber,
      },
    };

    try {
      const response = await fetch('/api/Khalti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      const responseData = await response.json();
      window.location.href = `${responseData?.responseData.payment_url}`;
      return responseData; // Return response data
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  };
  return (
    <>
      <div className='flex '>
        <div className='w-[25%]'>
          <ProfileLinks />
        </div>
        <div className='bg-theme p-[10px] w-[75%]'>
          <Table className='m-[10px] '>
            <TableCaption>A list of your bookings.</TableCaption>
            <TableHeader className='border border-black'>
              <TableRow>
                <TableHead className='w-[100px] '>S.N</TableHead>
                <TableHead>Pick Up Date</TableHead>
                <TableHead>Drop Off Date</TableHead>
                <TableHead className='text-right'>Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='border border-black'>
              {bookData?.share_car_data?.map((item, index) => (
                <TableRow key={index} className='border border-black'>
                  <TableCell className='font-medium'>
                    {item.booked_car_id}
                  </TableCell>
                  <TableCell>{item.pickUpDate.split('T')[0]}</TableCell>
                  <TableCell>{item.dropOffDate.split('T')[0]}</TableCell>
                  <TableCell className='text-right'>{`${item.totalPrice}`}</TableCell>
                  <div className=' flex justify-end gap-4 items-center'>
                    <TableCell className='text-right'>
                      <IoEyeOutline size={24} onClick={toggleModal} />
                      <ViewBooking
                        handleToggleModal={toggleModal}
                        open={open}
                        data={item}
                      />
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex gap-3'>
                        <Button onClick={handleDeleteModalToggle}>
                          Cancel Booking
                        </Button>
                        <DeleteModal
                          onClose={handleDeleteModalToggle}
                          open={deleteOpen}
                          title='booking'
                          onDelete={() => HandleDeleteOffers(item)}
                        />
                        <Button
                          disabled={item.isPaid}
                          onClick={() => confirmPayment(item)}
                        >
                          Make Payment
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
    </>
  );
};

export default MyBookingPage;
