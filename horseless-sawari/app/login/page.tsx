'use client';
import Logo from '@/assests/logo';
import SignUpModal from '@/components/modal/signUp-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useLoginForm, { IloginType } from './hooks/useLoginForm';
import InputPassword from '@/components/ui/inputPassword';

// import { useRouter } from "next/navigation";

const LoginPage: React.FC<IloginType> = () => {
  const [open, setOpen] = useState(false);
  const { submit, form } = useLoginForm();
  const toggleModal = () => {
    console.log('clicked');
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <div className='flex sm:my-9 sm:max-w-[1000px] m-auto sm:flex-row flex-col'>
        <div className='text-white flex flex-col sm:w-1/2 bg-purple px-[40px]'>
          <div className='flex justify-center'>
            <Logo />
          </div>
          <h1 className=' mt-[40px] whitespace-nowrap text-[32px] font-bold'>
            Welcome Back!
          </h1>
          <h2 className='whitespace-nowrap font-medium text-[14px] mt-[9px] '>
            Please Log in to your Account.
          </h2>
          <div className='mt-[30px]'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submit)}
                className='flex flex-col gap-[8px]'
              >
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter username' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputPassword field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=' flex justify-end mt-2'>
                  <Link href='/' className='text-[10px] text-red-700 underline'>
                    Forget password?
                  </Link>
                </div>
                <div className='flex justify-center '>
                  <Button
                    variant='secondary'
                    className=' bg-purple border-2 sm:mt-[0px] mt-[10px]'
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className='flex justify-center'>
            <Button
              type='button'
              onClick={toggleModal}
              variant='outline'
              className='border-purple border-2 max-w-[176px] sm:my-[15px] my-[20px] center'
            >
              CREATE MY ACCOUNT
            </Button>
          </div>
          <SignUpModal open={open} handleToggleModal={toggleModal} />
        </div>
        <div className='relative h-[580px] w-1/2 sm:block hidden'>
          <Image
            src='/images/loginImage.png'
            alt='hero'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
