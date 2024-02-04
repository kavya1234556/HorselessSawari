'use client';
import Logo from '@/assests/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export interface IResetPasswordType {
  password: string;
}
const ResetPasswordPage = ({ params }: any) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
        if (response.status === 400) {
          toast({
            title: 'Error',
            description: 'Invalid Token or has expired',
          });
        }

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error, try again', error);
      }
    };
    verifyToken(); //calling funtion from within
  }, [params.token]);

  const Schema = yup.object().shape({
    password: yup.string().required('Password is required').min(8),
  });
  const form = useForm({
    resolver: yupResolver(Schema),
  });
  const submit = async (values: IResetPasswordType) => {
    try {
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: values.password,
          email: user?.email,
        }),
      });
      console.log(
        '🚀 ~ file: useSignupForm.ts:51 ~ submit ~ response:',
        response
      );
      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Error has occurred',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Password changed successfully',
        });
        form.reset();
        router.push('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      // Handle unexpected errors, e.g., show a generic error message to the user
    }
  };
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your new password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center  mt-[10px] '>
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

export default ResetPasswordPage;
