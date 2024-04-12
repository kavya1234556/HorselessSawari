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
      {session.status === 'authenticated' ? (
        <div>
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
              <Button>Submit</Button>
            </form>
          </Form>
        </div>
      ) : (
        <div>Footer</div>
      )}
    </>
  );
};

export default Footer;
