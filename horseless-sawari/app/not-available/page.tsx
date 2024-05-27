import Image from 'next/image';
import React from 'react';

const NotAvailablePage = () => {
  return (
    <section className='flex flex-col justify-center h-[100%]  p-6'>
      <Image
        src='/images/no-car.png'
        alt='No Cars Available'
        className='w-1/2 h-auto mb-6'
        width={100}
        height={100}
      />
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        No Cars Available
      </h1>
      <p className='text-lg text-gray-600'>
        Please check back later or adjust your search criteria.
      </p>
    </section>
  );
};

export default NotAvailablePage;
