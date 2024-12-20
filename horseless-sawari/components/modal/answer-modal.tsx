import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Modal from '../ui/modal';
import useAddAnswer from '@/app/ManagerD/Questions/hooks/useAddAnswer';

type AnswerModalProps = {
  handleToggleModal: () => void;
  open: boolean;
  active?: string | null;
  id?: number;
};

export type IQuestionType = {
  answer: string;
};

const AnswerModal = ({ handleToggleModal, open, id }: AnswerModalProps) => {
  const answerSchema = yup.object().shape({
    answer: yup.string().required(),
  });

  const form = useForm<IQuestionType>({
    resolver: yupResolver(answerSchema) as any,
    defaultValues: {
      answer: '',
    },
  });

  const handleClose = () => {
    handleToggleModal();
    window.location.reload();
  };
  const { submit } = useAddAnswer(id);

  return (
    <Modal
      title=' Answer Question'
      className='font-bold max-w-[300px] h-[50%]'
      isOpen={open}
      onClose={handleClose}
    >
      <div className='p-[20px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name='answer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter your answer' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-3 mt-[20px]'>
              <Button type='submit'>Post</Button>

              <Button onClick={handleClose}>Close</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AnswerModal;
