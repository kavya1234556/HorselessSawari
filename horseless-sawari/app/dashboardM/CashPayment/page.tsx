import DashboradMLinks from '@/components/dashboardMLinks/page';
import React from 'react';

const CashPaymentPage = () => {
  return (
    <div className='flex '>
      <div className='w-[25%]'>
        <DashboradMLinks />
      </div>
      <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
        <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8  '>
          {/* <ChangePassword submit={submit} /> */}
        </div>
      </div>
    </div>
  );
};

export default CashPaymentPage;
