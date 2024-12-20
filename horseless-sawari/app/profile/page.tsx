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
import {
  setAcountID,
  setFirstName,
  setPhoneNumber,
} from '@/redux/reducers/account';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState<PreviewFileType | null>(
    null
  );
  const [user_id, setUserId] = useState(null);
  const [profile_data, setprofileData] = useState(null);
  console.log('🚀 ~ ProfilePage ~ profile_data:', profile_data);
  dispatch(setAcountID(profile_data?.accountDetails?.acc_id));
  const accountId = useSelector((state: any) => state.account.value.acc_id);
  console.log('🚀 ~ ProfilePage ~ accountId:', accountId);
  const UserId = parseInt(localStorage.getItem('user_id'));
  const profile_image = useGetProfileImage(UserId);
  useEffect(() => {
    if (accountId !== 0) {
      profile_image.then((data) => {
        console.log('🚀 ~ profile_image.then ~ data:', data);
        if (data.type === 'image/jpeg') {
          setProfileImage({
            id: uuidv4(),
            image_path: URL.createObjectURL(data),
            file: null,
          });
        }
      });
    }
  }, []);
  const profileData = useGetProfileForm(UserId);
  useEffect(() => {
    profileData
      .then((data) => {
        console.log('🚀 ~ .then ~ data:', data);
        if (data) {
          form.setValue(
            'profile_image',
            data?.accountDetails?.profile_image[0]
          );
          form.setValue('first_name', data?.accountDetails?.first_name);
          dispatch(setFirstName(data?.accountDetails?.first_name));
          form.setValue('last_name', data?.accountDetails?.last_name);
          form.setValue('phone_number', data?.accountDetails?.phone_number);
          dispatch(setPhoneNumber(data?.accountDetails?.phone_number));
        }
        setprofileData(data);
      })
      .catch((err) => {
        console.log('inside catch', err);
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
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/4 '>
          <ProfileLinks />
        </div>
        <div className='bg-theme w-[100%]'>
          <div className=' flex justify-center items-center'>
            <hr />
            <div className='bg-white p-[20px] m-[30px]'>
              <Form {...form}>
                <form
                  data-testid='profile-form'
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
                        data-testId='updateBtn'
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
