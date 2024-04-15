import Link from 'next/link';
import React from 'react';
import { PiPasswordLight } from 'react-icons/pi';
const ProfileLinks = () => {
  return (
    <>
      <div className='  h-[100vh] flex flex-col '>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/profile'>Profile Information</Link>
        </div>
        <div className='p-[10px]  border bottom-2 border-gray '>
          <Link href='/profile/my-booking'>My Bookings</Link>
        </div>
        <div className='p-[10px] border bottom-2 border-gray'>
          <Link href='/profile/my-vehicle-booking'>My Vehicle Booking</Link>
        </div>
        <div className=' p-[10px] border bottom-2 border-gray '>
          <Link href='/profile/my-transaction-history'>
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
