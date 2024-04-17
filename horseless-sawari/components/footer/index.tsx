'use client';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useAddQuestion from './hooks/useAddQuestion';
import { useSession } from 'next-auth/react';
import Navbar from '../navbar';
import Link from 'next/link';
export type IQusetionType = {
  question: string;
};
const Footer = () => {
  const id =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;

  const session = useSession();
  const questionSchema = yup.object().shape({
    question: yup.string().required(),
  });
  const form = useForm<IQusetionType>({
    resolver: yupResolver(questionSchema) as any,
    defaultValues: {
      question: '',
    },
  });
  const { submit } = useAddQuestion(id);
  return (
    <>
      {session?.data?.user?.role === 'USER' ? (
        <div className='flex flex-row justify-around text-black bg-theme items-center'>
          <div className='flex flex-col'>
            <Link href='/car-hosting'>Host Your Car</Link>
            <Link href='/profile'>My Profile</Link>
            <Link href='/car-pooling'>Carpool</Link>
            <Link href='/faq'>FAQ</Link>
          </div>
          <div className='p-[10px]'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)}>
                <FormField
                  control={form.control}
                  name='question'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your question' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='mt-[5px]'>Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Footer;
