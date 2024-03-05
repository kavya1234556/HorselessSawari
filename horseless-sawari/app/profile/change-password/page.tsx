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

const ChangePasswordpage = () => {
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;

  const { form, submit } = useChangePassword(UserId);
  return (
    <div className=' flex gap-24 md:flex-row sm:flex-col lg:flex-row max-w-[1920px] m-auto'>
      <div className='flex-shrink-0 w-1/4'>
        <ProfileLinks />
      </div>
      <div className='sm:w-3/4 '>
        <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8  '>
          <div className='bg-purple p-[20px] border-4 shadow-lg w-[40%] h-[60vh] '>
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
                        <Input
                          placeholder='Enter your Old password'
                          {...field}
                        />
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
                        <Input
                          placeholder='Enter your new password'
                          {...field}
                        />
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
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordpage;
