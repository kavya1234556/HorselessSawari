import Link from 'next/link';
import React from 'react';

const ProfileLinks = () => {
  return (
    <>
      <div className=' p-[4px] flex flex-col gap-4'>
        <h1>Profile</h1>
        <div className='border border-purple p-[10px] w-[250px] '>
          <Link href='/profile'>Profile Information</Link>
        </div>
        <div className='border border-purple p-[10px] w-[250px]'>
          <Link href='/profile/my-booking'>My Bookings</Link>
        </div>
        <div className='border border-purple p-[10px] w-[250px]'>
          <Link href='/profile/my-vehicle-booking'>My Vehicle Booking</Link>
        </div>
        <div className='border border-purple p-[10px] w-[250px]'>
          <Link href='/profile/my-transaction-history'>
            My Transaction history
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileLinks;
