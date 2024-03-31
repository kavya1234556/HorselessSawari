import Link from 'next/link';
import React from 'react';

const DashboardLink = () => {
  return (
    <>
      <div className='  h-[100vh] flex flex-col '>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard/location'>Add Location</Link>
        </div>
        <div className='p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard/manufacture'>Add Manufacture</Link>
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
            Change Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardLink;
