import Image from 'next/image';
import React from 'react';

const FAQPage = () => {
  return (
    <div className='p-[40px]'>
      <h1 className='text-center text-[40px] text-slate-600 font-bold'>
        Do You Have Questions?
      </h1>
      <h2 className='text-center text-[28px] leading-10 text-slate-500 font-medium'>
        We have answers(well,most of the times!)
      </h2>
      <h3 className='text-center'>
        Find answers to commonly asked questions about Rental Sawari
      </h3>
      <div className='flex justify-center m-[30px]'>
        <Image
          src={'/images/think.png'}
          alt='faq image'
          width={200}
          height={300}
        />
      </div>
      <hr />
    </div>
  );
};

export default FAQPage;
