import Link from 'next/link';
import React from 'react';

const DashboradMLinks = () => {
  return (
    <>
      <div className='  h-[100vh] flex flex-col '>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboardM'>Verify Hosted Car</Link>
        </div>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboardM/CashPayment'>Make Cash Payment</Link>
        </div>
        <div className=' p-[10px]  border bottom-2 border-gray '>
          <Link href='/dashboardM/change-password'>Change Password</Link>
        </div>
      </div>
    </>
  );
};

export default DashboradMLinks;
