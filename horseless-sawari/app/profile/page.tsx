'use client';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import ProfileLinks from '@/components/profileLinks';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { PreviewFileType } from '@/types/preview-file-types';
import { Input } from '@/components/ui/input';
import SingleImageDropzone from '@/components/ui/image-dropzone/single-image-dropzone';
import useAddProfileForm from './hooks/useAddProfileForm';
import useGetProfileForm from './hooks/useGetProfile';
import useEditProfileForm from './hooks/useEditProfileForm';
import useGetProfileImage from './hooks/useGetProfileImage';

const ProfilePage = () => {
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState<PreviewFileType | null>(
    null
  );
  const [user_id, setUserId] = useState(null);
  const [profile_data, setprofileData] = useState(null);

  useEffect(() => {
    const UserId = parseInt(localStorage.getItem('user_id'));
    const profileImage = useGetProfileImage(UserId);
    profileImage.then((data) => {
      setProfileImage({
        id: uuidv4(),
        image_path: URL.createObjectURL(data),
        file: null,
      });
    });
    const profileData = useGetProfileForm(UserId);
    profileData
      .then((data) => {
        if (data) {
          form.setValue(
            'profile_image',
            data?.accountDetails?.profile_image[0]
          );
          form.setValue('first_name', data?.accountDetails?.first_name);
          form.setValue('last_name', data?.accountDetails?.last_name);
          form.setValue('phone_number', data?.accountDetails?.phone_number);
        }
        setprofileData(data);
      })
      .catch((err) => {
        console.log('inside catch');
      });
    setUserId(UserId);
  }, []);
  const { form, submit } = useAddProfileForm(user_id);
  const { update } = useEditProfileForm(user_id);
  const handleUpdateClick = async () => {
    try {
      update(form.getValues());
    } catch (error) {
      console.error('Update failed', error);
    }
  };

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
                  onSubmit={form.handleSubmit(submit)}
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
                              file={profileImage}
                              setFile={setProfileImage}
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
                            onChange={setPhone(phone)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {profile_data?.error ? (
                    <div className='flex justify-    center mt-[10px]'>
                      <Button
                        variant='secondary'
                        className=' bg-purple border-2 sm:mt-[0px] mt-[10px]'
                      >
                        Submit
                      </Button>
                    </div>
                  ) : (
                    <div className='flex justify-    center mt-[10px]'>
                      <Button
                        type='button'
                        variant='secondary'
                        className=' bg-purple border-2 sm:mt-[0px] mt-[10px]'
                        onClick={handleUpdateClick}
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
