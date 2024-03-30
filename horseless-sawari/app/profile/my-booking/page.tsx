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

const MyBookingPage = () => {
  const [bookData, setBookData] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;
  useEffect(() => {
    const BookingDetail = useGetUserBooking(UserId);
    BookingDetail.then((data) => setBookData(data));
  }, []);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  function handleDeleteModalToggle() {
    setDeleteOpen((prev) => !prev);
  }
  function handleDeleteOffers(item) {
    console.log('I am clicked');
    console.log(item);
    useDeleteBooking(item.booked_car_id);
    handleDeleteModalToggle();
    window.location.reload();
  }
  return (
    <>
      <div className='w-[25%]'>
        <h1 className='font-light text-[20px] text-white bg-gray p-[30px] text-center'>
          Profile
        </h1>
      </div>
      <div className='flex '>
        <div className='w-[25%]'>
          <ProfileLinks />
        </div>
        <div className='bg-theme w-[75%]'>
          <Table className='m-[10px]'>
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
                          onDelete={() => handleDeleteOffers(item)}
                        />
                        <Button>Make Payment</Button>
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
