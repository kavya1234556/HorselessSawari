'use client';
import useChangePassword from '@/app/profile/change-password/hooks/useChangePassword';
import Logo from '@/assests/logo';
import ProfileLinks from '@/components/profileLinks';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputPassword from './ui/inputPassword';

export interface IChangePasswordType {
  OldPassword: string;
  NewPassword: string;
}
const ChangePassword = ({ submit }) => {
  const Schema = yup.object().shape({
    OldPassword: yup.string().required('Old Password is required').min(8),
    NewPassword: yup.string().required('New Password is required').min(8),
  });
  const form = useForm({
    resolver: yupResolver(Schema),
  });
  return (
    <>
      <div className='bg-white p-[20px] border-4 shadow-lg w-[40%] h-[60vh] '>
        <div className='flex justify-center'>
          <Logo />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className='flex flex-col gap-[10px]'
          >
            <FormField
              control={form.control}
              name='OldPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <InputPassword field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='NewPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <InputPassword field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center  mt-[10px] '>
              <Button
                variant='secondary'
                className=' bg-purple border-2 sm:mt-[15px] mt-[10px]'
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
