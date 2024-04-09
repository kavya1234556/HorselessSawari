'use client';

import ProfileLinks from '@/components/profileLinks';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import useGetTransactionDetail from './hooks/useGetTransactionDetail';

const TransactionHistoryPage = () => {
  const [detail, setDetail] = useState(null);
  console.log(detail);
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;
  useEffect(() => {
    const TransacDetail = useGetTransactionDetail(UserId);
    TransacDetail.then((data) => setDetail(data));
  }, []);
  return (
    <>
      <div className='w-[25%]'>
        <h1 className='font-light text-[20px] text-white bg-gray p-[30px] text-center'>
          Profile
        </h1>
      </div>
      <div className='flex '>
        <div className='w-[25%]'>
          <ProfileLinks />
        </div>
        <div className='bg-theme w-[75%]'>
          <Table className='m-[10px]'>
            <TableCaption>A list of your Transaction.</TableCaption>
            <TableHeader className='border border-black'>
              <TableRow>
                <TableHead className='w-[100px] '>S.N</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead className='text-right'>Total Amount</TableHead>
                <TableHead className='text-right'>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='border border-black'>
              {detail?.transactions?.map((item, index) => (
                <TableRow key={index} className='border border-black'>
                  <TableCell className='font-medium'>{index + 1}</TableCell>
                  <TableCell>{item.Date.split('T')[0]}</TableCell>
                  <TableCell>{item.transaction_id}</TableCell>
                  <TableCell className='text-right'>
                    {item.total_amount}
                  </TableCell>
                  <TableCell className='text-right'>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TransactionHistoryPage;
