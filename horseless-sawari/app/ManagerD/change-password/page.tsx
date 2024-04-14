'use client';
import ChangePassword from '@/components/change-password';
import DashboradMLinks from '@/components/dashboardMLinks/page';
import React from 'react';
import useChangePassword from './hooks/useChangePassword';

const ChangePasswordPage = () => {
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;

  const { submit } = useChangePassword(UserId);
  return (
    <div className='flex '>
      <div className='w-[25%]'>
        <DashboradMLinks />
      </div>
      <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
        <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8  '>
          <ChangePassword submit={submit} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
