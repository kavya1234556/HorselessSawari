'use client';
import Logo from '@/assests/logo';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useForgetPasswordForm from './useForgetPasswordForm';

const ForgetPasswordPage = () => {
  const { submit, form } = useForgetPasswordForm();
  return (
    <div className='min-h-[100vh] flex items-start justify-center pt-28 sm:px-6 lg:px-8  '>
      <div className='bg-purple p-[20px] border-4 shadow-lg w-[40%] h-[45vh] '>
        <div className='flex justify-center'>
          <Logo />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className='flex flex-col gap-[30px]'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center mt-[10px]'>
              <Button
                variant='secondary'
                className=' bg-purple border-2 sm:mt-[0px] mt-[10px]'
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
