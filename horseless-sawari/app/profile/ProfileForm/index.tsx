'use client';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import ProfileLinks from '@/components/profileLinks';
import { useEffect, useState } from 'react';
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
import useAddProfileForm from '../hooks/useAddProfileForm';
import SingleImageDropzone from '@/components/ui/image-dropzone/single-image-dropzone';
import useGetProfileForm from '../hooks/useGetProfile';

const ProfileForm = () => {
  // const [phone, setPhone] = useState('');
  // const [coverImage, setCoverImage] = useState<PreviewFileType | null>(null);
  // const [user_id, setUserId] = useState(null);
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const UserId = parseInt(localStorage.getItem('user_id'));
  //   setUserId(UserId);
  // }, []);
  // const { form, submit } = useAddProfileForm(user_id);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const profileData = await useGetProfileForm(user_id);
  //       console.log('🚀 ~ ProfilePage ~ data:', profileData);
  //       setData(profileData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [user_id]);
  // useEffect(() => {
  //   if (data) {
  //     form.setValue('first_name', data?.accountDetails?.first_name);
  //     form.setValue('last_name', data?.accountDetails?.last_name);
  //     form.setValue('phone_number', data?.accountDetails?.phone_number);
  //   }
  // }, [data]);
  // console.log(data);
  // return (
  //   <>
  //     <div className=' flex gap-24 md:flex-row sm:flex-col lg:flex-row max-w-[1920px] m-auto'>
  //       <div className='flex-shrink-0 w-1/4'>
  //         <ProfileLinks />
  //       </div>
  //       <div className='sm:w-3/4 '>
  //         <h2>Personal Information</h2>
  //         <div className='w-[60%] bg-gray flex justify-center items-center'>
  //           <hr />
  //           <div>
  //             <Form {...form}>
  //               <form
  //                 onSubmit={form.handleSubmit(submit)}
  //                 className='flex flex-col gap-[30px] '
  //               >
  //                 <div className='flex justify-center items-center'>
  //                   <FormField
  //                     control={form.control}
  //                     name='profile_image'
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel></FormLabel>
  //                         <FormControl>
  //                           <SingleImageDropzone
  //                             file={coverImage}
  //                             setFile={setCoverImage}
  //                             {...field}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div>
  //                 <FormField
  //                   control={form.control}
  //                   name='first_name'
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>First Name</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder='Enter your email' {...field} />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 <FormField
  //                   control={form.control}
  //                   name='last_name'
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Last Name</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder='Enter your email' {...field} />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 <FormField
  //                   control={form.control}
  //                   name='phone_number'
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Phone Number</FormLabel>
  //                       <FormControl>
  //                         <PhoneInput
  //                           className=' bg-white'
  //                           flags={flags}
  //                           country={'us'}
  //                           onChange={setPhone(phone)}
  //                           {...field}
  //                         />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 <div className='flex justify-    center mt-[10px]'>
  //                   <Button
  //                     variant='secondary'
  //                     className=' bg-purple border-2 sm:mt-[0px] mt-[10px]'
  //                   >
  //                     Submit
  //                   </Button>
  //                 </div>
  //               </form>
  //             </Form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default ProfileForm;
