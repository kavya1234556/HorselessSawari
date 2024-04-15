'use client';
import DashboradMLinks from '@/components/dashboardMLinks/page';
import VerifyHostiong from '@/components/modal/verify-hosting';
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
import { IoEyeOutline } from 'react-icons/io5';
import useGetCarDetail from './hooks/useGetCarDetail';
import { Button } from '@/components/ui/button';
import useEditVerfication from './hooks/useEditVerfication';

const DashboradMPage = () => {
  const [open, setOpen] = useState(false);
  const [carDetail, setCarDetail] = useState(null);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    const car_detail = useGetCarDetail();
    car_detail.then((data) => setCarDetail(data));
  }, []);
  const handleVerification = (id: number) => {
    useEditVerfication(id);
  };
  return (
    <div className='flex '>
      <div className='w-[25%]'>
        <DashboradMLinks />
      </div>
      <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
        <Table className='m-[10px]'>
          <TableCaption>A list of your hosted cars to verify.</TableCaption>
          <TableHeader className='border border-black'>
            <TableRow>
              <TableHead className='w-[100px] '>S.N</TableHead>
              <TableHead>Owner Name</TableHead>
              <TableHead>Manufacture</TableHead>
              <TableHead>Fuel Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border border-black'>
            {carDetail?.car_data_final?.map((item, index) => (
              <TableRow key={index} className='border border-black'>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell>{item.onwerName}</TableCell>
                <TableCell>{item.manufacture}</TableCell>
                <TableCell>{item.fuel_Type}</TableCell>
                <div className=' flex justify-end gap-4 items-center'>
                  <TableCell>
                    <IoEyeOutline size={24} onClick={toggleModal} />
                    <VerifyHostiong
                      handleToggleModal={toggleModal}
                      open={open}
                      data={item}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleVerification(item.carID)}>
                      Verify
                    </Button>
                  </TableCell>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboradMPage;
