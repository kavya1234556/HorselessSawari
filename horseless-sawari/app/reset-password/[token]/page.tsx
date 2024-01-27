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
  // const { token } = router.query;
  const [verified, setVerified] = useState(false);
  // State for managing the new password form
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
          setVerified(true);
        }

        if (response.ok) {
          setVerified(true);
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error, try again', error);
      }
    };
    verifyToken(); //calling funtion from within
  }, [params.token]);

  const handleResetPassword = async () => {};

  if (!params.token) {
    return <p>Loading...</p>; // You might want to add a loading state
  }
  const Schema = yup.object().shape({
    password: yup.string().required('Password is required').min(8),
  });
  const form = useForm({
    resolver: yupResolver(Schema),
  });
  const submit = async (values: IResetPasswordType) => {
    console.log('🚀 ~ submit ~ values:', values);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
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
    <div className='min-h-[100vh] flex items-start justify-center pt-28 sm:px-6 lg:px-8 '>
      <Logo />
      <div className='mt-[30px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className='flex flex-col gap-[8px]'
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
            <div className='flex justify-center '>
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