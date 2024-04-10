'use client';
import DashboardLink from '@/components/dashboradLinks/page';
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
import useGetAllTransactions from './hooks/useGetAllTransactions';

const TransactionPage = () => {
  const [transac, setTransac] = useState(null);
  console.log('🚀 ~ TransactionPage ~ transac:', transac?.UserTransaction);
  useEffect(() => {
    const Detail = useGetAllTransactions();
    Detail.then((data) => setTransac(data));
  }, []);
  return (
    <>
      <div className='flex '>
        <div className='w-[25%]'>
          <DashboardLink />
        </div>
        <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
          <Table className='m-[10px]'>
            <TableCaption> List of Users.</TableCaption>
            <TableHeader className='border border-black'>
              <TableRow>
                <TableHead className='w-[100px] '>S.N</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='border border-black'>
              {transac?.UserTransaction?.map((item, index) => (
                <TableRow key={index} className='border border-black'>
                  <TableCell className='font-medium'>{index + 1}</TableCell>
                  <TableCell>{item.Date.split('T')[0]}</TableCell>
                  <TableCell>{item.transaction_id}</TableCell>
                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.paymentMethod}</TableCell>
                  <TableCell>{item.user.id}</TableCell>
                  <TableCell>{item.user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
