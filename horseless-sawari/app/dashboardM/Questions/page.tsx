'use client';
import React, { useEffect, useState } from 'react';
import useGetAllQuestion from './hooks/useGetAllQuestion';
import DashboradMLinks from '@/components/dashboardMLinks/page';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IoEyeOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import AnswerModal from '@/components/modal/answer-modal';

const QuestionPage = () => {
  const [ques, setQues] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    const Questions = useGetAllQuestion();
    Questions.then((data) => setQues(data));
  }, []);
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
              <TableHead>Question</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border border-black'>
            {ques?.questionData?.map((item, index) => (
              <TableRow key={index} className='border border-black'>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell>{item.question}</TableCell>

                <div className=' flex justify-end gap-4 items-center'>
                  <TableCell>
                    <IoEyeOutline size={24} onClick={toggleModal} />
                    <AnswerModal
                      handleToggleModal={toggleModal}
                      open={open}
                      data={item}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                    // onClick={() => handleVerification(item.carID)}
                    >
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

export default QuestionPage;
