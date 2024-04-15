'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import useGetQuestionAnswsers from './hooks/useGetQuestionAnswsers';
const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [data, setData] = useState(null);
  console.log('🚀 ~ FAQPage ~ data:', data);

  const toggleModal = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const QuestionAnswers = useGetQuestionAnswsers();
  useEffect(() => {
    QuestionAnswers.then((data) => setData(data));
  });
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
      {data?.AllData?.map((item, index) => (
        <div key={index} className='mb-4'>
          <div className='flex items-center justify-between bg-gray-200 p-4 rounded-md shadow-md'>
            <div className='truncate flex items-center gap-1'>
              <p className='text-lg font-semibold '>{index + 1}.</p>
              <h1 className='text-lg font-semibold '>{item.question}</h1>
            </div>

            <span className='cursor-pointer'>
              {openIndex === index ? (
                <MdOutlineKeyboardArrowUp
                  className='text-gray-600 w-6 h-6'
                  onClick={() => toggleModal(index)}
                />
              ) : (
                <MdOutlineKeyboardArrowDown
                  className='text-gray-600 w-6 h-6'
                  onClick={() => toggleModal(index)}
                />
              )}
            </span>
          </div>
          {openIndex === index && (
            <div className='mt-2 p-4 bg-gray-100 rounded-md shadow-md'>
              {item?.answer === null ? (
                <p> Waiting for response...</p>
              ) : (
                <p className='text-gray-800 '>{item?.answer?.answer}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
