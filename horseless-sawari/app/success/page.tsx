'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const carBookedId = useSelector(
    (state: any) => state.payment_booking.value.car_booked_id
  );
  const searchParams = useSearchParams();
  const pidx = searchParams.get('pidx');

  useEffect(() => {
    const processPayment = async () => {
      try {
        const UserId =
          typeof window !== 'undefined' && localStorage
            ? parseInt(localStorage.getItem('user_id'))
            : null;

        const response = await fetch(
          `/api/payment-conformation?pidx=${pidx}&booked_car_id=${carBookedId}&user_id=${UserId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to process payment');
        }

        const responseData = await response.json();
        setResponseData(responseData);
      } catch (error) {
        console.error('Error processing payment:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [pidx, carBookedId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center'>
        <h3 className='text-3xl text-gray-800 font-semibold mb-4'>
          Thank you for your payment!
        </h3>
        <p className='text-gray-600'>
          We appreciate your business and look forward to serving you again.
        </p>
        <div className='flex justify-center'>
          <Image
            width={100}
            height={100}
            src='/images/thankYou.png'
            alt='Thank you Image'
            className='object-contain max-w-full h-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
