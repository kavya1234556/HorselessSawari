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
import useDeleteQuestion from './hooks/useDeleteQuestionss';
import DeleteModal from '@/components/modal/delete-modal';

const QuestionPage = () => {
  const [ques, setQues] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  console.log('🚀 ~ QuestionPage ~ selectedQuestion:', selectedQuestion);
  function handleDeleteModalToggle() {
    setDeleteOpen((prev) => !prev);
  }
  const Questions = useGetAllQuestion();
  useEffect(() => {
    Questions.then((data) => setQues(data));
  }, []);

  const HandleViewQuestion = (questionId) => {
    console.log('🚀 ~ handleViewQuestion ~ questionId:', questionId);
    setSelectedQuestion(questionId);
    setOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setOpen(false);
  };
  const HandleDelete = (id: number) => {
    useDeleteQuestion(id);
    handleDeleteModalToggle();
    window.location.reload();
  };

  return (
    <div className='flex'>
      <div className='w-[25%]'>
        <DashboradMLinks />
      </div>
      <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
        <Table className='m-[10px]'>
          <TableCaption>A list of Questions.</TableCaption>
          <TableHeader className='border border-black'>
            <TableRow>
              <TableHead className='w-[100px]'>S.N</TableHead>
              <TableHead>Question</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border border-black'>
            {ques?.questionData?.map((item, index) => (
              <TableRow key={index} className='border border-black'>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell className='truncate'>{item.question}</TableCell>
                <TableCell>
                  <IoEyeOutline
                    size={24}
                    onClick={() => HandleViewQuestion(item.quest_id)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={handleDeleteModalToggle}>Delete</Button>
                </TableCell>
                <DeleteModal
                  onClose={handleDeleteModalToggle}
                  open={deleteOpen}
                  title='Question'
                  onDelete={() => HandleDelete(item.quest_id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {open && (
          <AnswerModal
            handleToggleModal={handleCloseModal}
            open={true}
            id={selectedQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
