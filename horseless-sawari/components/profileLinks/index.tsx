import Link from 'next/link';
import React from 'react';
import { PiPasswordLight } from 'react-icons/pi';
import { TbBrandBooking } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { GrTransaction } from 'react-icons/gr';
const ProfileLinks = () => {
  return (
    <>
      <div className='  h-[30vh] md:h-[100vh] flex flex-col '>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link className='flex gap-4 items-center' href='/profile'>
            <CgProfile />
            Profile Information
          </Link>
        </div>
        <div className='p-[10px]  border bottom-2 border-gray '>
          <Link className='flex gap-4 items-center' href='/profile/my-booking'>
            <TbBrandBooking />
            My Bookings
          </Link>
        </div>
        <div className='p-[10px] border bottom-2 border-gray'>
          <Link
            className='flex gap-4 items-center'
            href='/profile/my-vehicle-booking'
          >
            <TbBrandBooking />
            My Vehicle Booking
          </Link>
        </div>
        <div className=' p-[10px] border bottom-2 border-gray '>
          <Link
            className='flex gap-4 items-center'
            href='/profile/my-transaction-history'
          >
            <GrTransaction />
            My Transaction history
          </Link>
        </div>
        <div className=' p-[10px] border bottom-2 border-gray'>
          <Link
            href='/profile/change-password'
            className='flex gap-4 items-center'
          >
            <PiPasswordLight />
            Change Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileLinks;
