'use client';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import ProfileLinks from '@/components/profileLinks';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import SingleImageDropzone from '@/components/ui/image-dropzone/single-image-dropzone';
import { PreviewFileType } from '@/types/preview-file-types';
import { Input } from '@/components/ui/input';
import useAddProfileForm from './hooks/useAddProfileForm';

const ProfilePage = () => {
  const [phone, setPhone] = useState('');
  const [coverImage, setCoverImage] = useState<PreviewFileType | null>(null);
  const { form } = useAddProfileForm();

  return (
    <>
      <div className=' flex gap-24 md:flex-row sm:flex-col lg:flex-row max-w-[1920px] m-auto'>
        <div className='flex-shrink-0 w-1/4'>
          <ProfileLinks />
        </div>
        <div className='sm:w-3/4 '>
          <h2>Personal Information</h2>
          <div className='w-[60%] bg-gray flex justify-center items-center'>
            <hr />
            <div>
              <Form {...form}>
                <form
                  //onSubmit={form.handleSubmit(submit)}
                  className='flex flex-col gap-[30px] '
                >
                  <div className='flex justify-center items-center'>
                    <FormField
                      control={form.control}
                      name='profile_image'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <SingleImageDropzone
                              file={coverImage}
                              setFile={setCoverImage}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone_number'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            className=' bg-white'
                            flags={flags}
                            country={'us'}
                            value={phone}
                            onChange={(phone: string) => setPhone(phone)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-    center mt-[10px]'>
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
          {/* <h2 className=' text-center mt-6 sm:mt-0 font-bold'>Welcome!</h2>
        <h1 className='text-[24px] text-center font-bold mt-6 sm:mt-0'>
        Create an account
        </h1>
        <div className='bg-lightGray mt-6 mb-[50px] max-w-[300] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[750px] 2xl:max-w-[826px] m-auto'>
        <form>
        <div className='flex relative justify-center pt-12 border rounded-full bg-white w-32 h-32 '>
        <button
        type='button'
        className='absolute top ml-20 w-10 h-10 rounded-full bottom-1 cursor-pointer bg-lightGray shadow-md '
        >
        <input type='file' accept='image' className='hidden' />
        <MdAddAPhoto />
        </button>
        </div>
            <div className='flex flex-col px-[34px] gap-4 sm:gap-1.5'>
            <label className='font-semibold'> Name </label>
            <input placeholder='Full name' className='p-[10px] rounded-md' />
            <label className='font-semibold'> Company </label>
            <input
            placeholder='Company Name'
            className='p-[10px] rounded-md'
            />
            <label className='font-semibold '> Email </label>
            <input
            placeholder='you@company.com'
            className='p-[10px] rounded-sm'
            />
              <label className='font-semibold'> Phone Number </label>
              <PhoneInput
              className=' bg-white'
              flags={flags}
              country={'us'}
              value={phone}
              onChange={(phone: string) => setPhone(phone)}
              />
              <label className='font-semibold'> Confirm Passwod </label>
              <input
              placeholder='Confirm Password'
              className='p-[10px] rounded-sm'
              />

              <button className='mr-[60px] h-[40px] text-white w-full rounded-md bg-gradient-to-r from-footerHeading to-parrot'>
              Confirm
              </button>
              <hr className='border-t-2 border-gray-200 mb-[30px]'></hr>
              </div>
              </form>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
