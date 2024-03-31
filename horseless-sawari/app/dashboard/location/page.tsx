'use client';
import * as yup from 'yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SingleImageDropzone from '@/components/ui/image-dropzone/single-image-dropzone';
import { Input } from '@/components/ui/input';
import { PreviewFileType } from '@/types/preview-file-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import DashboardLink from '@/components/dashboradLinks/page';
export interface ILocationType {
  location_name: string;
  location_image: string;
}
const Location = () => {
  const schema = yup.object().shape({
    location_image: yup
      .mixed()
      .required('Please select a location image')
      .test('empty', 'Please select a location image', (value: any) => {
        if (value && value.length > 0) return true;
        return false;
      }),
    location_name: yup.string().required('Required'),
  });

  const form = useForm<ILocationType>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      location_image: null,
      location_name: '',
    },
  });

  const submit = async (values: ILocationType) => {
    const formdata = new FormData();
    formdata.append('location_image', values.location_image[0]);
    formdata.append('location_name', values.location_name);
    try {
      console.log(formdata);
      const response = await fetch('/api/dashboard/location', {
        method: 'POST',
        body: formdata,
      });

      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Error has occurred',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your location is added successfully',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred while adding location', error);
    }
  };

  const [locationImage, setLocationImage] = useState<PreviewFileType | null>(
    null
  );
  return (
    <>
      <div className='flex '>
        <div className='w-[25%]'>
          <DashboardLink />
        </div>
        <div className='sm:w-3/4 bg-theme'>
          <div className='min-h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8  '>
            <div className='bg-white p-[20px] border-4 shadow-lg w-[40%] h-[70vh] '>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className='flex flex-col gap-[30px] '
                >
                  <div className='flex justify-center items-center'>
                    <FormField
                      control={form.control}
                      name='location_image'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <SingleImageDropzone
                              file={locationImage}
                              setFile={setLocationImage}
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
                    name='location_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>location Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter location' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button>Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
