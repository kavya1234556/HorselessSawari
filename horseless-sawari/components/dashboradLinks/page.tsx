import Link from 'next/link';
import React from 'react';

const DashboardLink = () => {
  return (
    <>
      <div className='  h-[100vh] flex flex-col '>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard'>Dashboard</Link>
        </div>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard/users'>Users</Link>
        </div>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard/location'>Location</Link>
        </div>
        <div className='p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard/manufacture'> Category</Link>
        </div>
        <div className='p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboard/transactions'> Transactions</Link>
        </div>
        <div className=' p-[10px] border bottom-2 border-gray'>
          <Link
            href='/dashboard/change-password'
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
