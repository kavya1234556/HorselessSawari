'use client';
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
import useChangePassword from './hooks/useChangePassword';
import ChangePassword from '@/components/change-password';

const ChangePasswordpage = () => {
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;

  const { submit } = useChangePassword(UserId);
  return (
    <>
      <div className='w-[25%]'>
        <h1 className='font-light text-[20px] text-white bg-gray p-[30px] text-center'>
          Profile
        </h1>
      </div>
      <div className='flex '>
        <div className='w-[25%]'>
          <ProfileLinks />
        </div>
        <div className='sm:w-3/4 bg-theme'>
          <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8  '>
            <ChangePassword submit={submit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordpage;
