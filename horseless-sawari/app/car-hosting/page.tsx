'use client';
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
import React, { useEffect, useState } from 'react';
import useAddCarForHosting from './hooks/useAddCarForHosting';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import MultipleImageDropzone from '@/components/ui/multi-image-dropzone/multi-image-dropzone';
import { PreviewFileType } from '@/types/preview-file-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/dropdown';
import useGetLocation from './hooks/useGetLocation';
import useGetCatagory from './hooks/useGetCatagory';

export interface ICarType {
  ownerName: string;
  manufacture: string;
  registration_num: number;
  features: string;
  no_of_seats: number;
  fuel_Type: string;
  color: string;
  Total_km: number;
  car_images: [];
  bluebook_image: [];
  insurance_image: [];
  pricing_per_hour: number;
  pricing_per_four_hour: number;
  pricing_per_eight_hour: number;
  pricing_per_day: number;
  is_booked: boolean;
  is_verified: boolean;
  user_id: number;
  user_role: string;
  category_id: number;
  location_id: number;
}

const CarHostingPage = () => {
  const [carImage, setCarImage] = useState<PreviewFileType[]>([]);
  const [bluebookImage, setBlueBookImage] = useState<PreviewFileType[]>([]);
  const [insuranceImage, setInsuranceImage] = useState<PreviewFileType[]>([]);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  // console.log(
  //   'Location',
  //   location?.location.map((item) => item.location_name)
  // );
  //   useEffect(function persistForm() {
  //   // 👍 We're not breaking the first rule anymore
  //   if (name !== '') {
  //     localStorage.setItem('formData', name);
  //   }
  // });
  const location_data = useGetLocation();
  const category_data = useGetCatagory();
  useEffect(() => {
    location_data.then((data) => {
      setLocation(data);
    });
    category_data.then((data) => {
      setCategory(data);
    });
  }, []);
  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;

  const userRole =
    typeof window !== 'undefined' && localStorage
      ? localStorage.getItem('role')
      : null;

  const carSchema = yup.object().shape({
    ownerName: yup.string().required(),
    manufacture: yup.string().required(),
    registration_num: yup
      .number()
      .required('Registration number is required')
      .positive()
      .min(1),
    features: yup.string().required(),
    no_of_seats: yup.number().required().positive().min(1),
    color: yup.string().required(),
    Total_km: yup.number().required().positive().min(1),
    car_images: yup
      .mixed()
      .required('Please select car images')
      .test('empty', 'Please select atleast 5 image', (value: any) => {
        if (Number(value.length) > 0) return true;
        return false;
      }),
    bluebook_image: yup
      .mixed()
      .required('Please select bluebook image')
      .test('empty', 'Please select atleast 2 image', (value: any) => {
        if (Number(value.length) > 0) return true;
        return false;
      }),
    insurance_image: yup
      .mixed()
      .required('Please select insurance image')
      .test('empty', 'Please select insurance image', (value: any) => {
        if (Number(value.length) > 0) return true;
        return false;
      }),
    pricing_per_hour: yup.number().required().positive().min(1),
    pricing_per_four_hour: yup.number().required().positive().min(1),
    pricing_per_eight_hour: yup.number().required().positive().min(1),
    pricing_per_day: yup.number().required().positive().min(1),
    is_booked: yup.bool().required(),
    is_verified: yup.bool().required(),
    fuel_Type: yup.string().required(),
    location_id: yup.number().required(),
    category_id: yup.number().required(),
  });
  const form = useForm<ICarType>({
    resolver: yupResolver(carSchema) as any,
    defaultValues: {
      ownerName: '',
      manufacture: '',
      registration_num: undefined,
      features: '',
      no_of_seats: undefined,
      color: '',
      Total_km: undefined,
      car_images: [],
      bluebook_image: [],
      insurance_image: [],
      pricing_per_hour: undefined,
      pricing_per_four_hour: undefined,
      pricing_per_eight_hour: undefined,
      pricing_per_day: undefined,
      is_booked: false,
      is_verified: false,
      user_id: undefined,
      fuel_Type: 'DISEL',
      user_role: '',
      location_id: undefined,
      category_id: undefined,
    },
  });
  const { submit } = useAddCarForHosting(UserId, userRole);
  return (
    <div className='p-4 md:p-8'>
      <h1 className='text-2xl font-medium'>Topics</h1>
      <div className='flex flex-col md:flex-row my-4 gap-8'>
        <div className='flex flex-col gap-4 h-[30%] w-full md:w-1/3 bg-gray p-4'>
          <label className='font-semibold text-lg'>
            1. General Information
          </label>
          <label className='font-semibold text-lg'>2. Vehicle Image</label>
          <label className='font-semibold text-lg'>
            3. Address Information
          </label>
          <label className='font-semibold text-lg'>
            4. Pricing Information
          </label>
          <label className='font-semibold text-lg'>5. Guest Information</label>
        </div>
        <div className='w-full md:w-2/3 bg-gray py-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className='flex flex-col gap-8'
            >
              <div className='p-4'>
                <h1 className='mb-4 font-bold'>General Information</h1>
                <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='ownerName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='manufacture'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Manufacture </FormLabel>
                        <FormControl>
                          <Input placeholder='Enter manufacture' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='category_id'
                    render={({ field: { onChange, ...rest } }) => {
                      return (
                        <FormItem>
                          <FormLabel> Category </FormLabel>
                          <FormControl>
                            <Select onValueChange={(value) => onChange(value)}>
                              <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='Select Category' />
                              </SelectTrigger>
                              <SelectContent>
                                {category?.Category?.map((item: any) => (
                                  <SelectItem
                                    {...rest}
                                    key={item.category_id}
                                    value={`${item.category_id}`}
                                  >
                                    {item.category_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='registration_num'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Registration Number </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter Registration Number'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <h1 className='mt-[20px] mb-[10px] font-bold'>
                  Vehicle Information
                </h1>
                <FormField
                  control={form.control}
                  name='features'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Features </FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Features' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='gap-4 grid grid-cols-1 md:grid-cols-2 my-3'>
                  <FormField
                    control={form.control}
                    name='fuel_Type'
                    render={({ field: { onChange, ...rest } }) => {
                      return (
                        <FormItem>
                          <FormLabel>Fuel:</FormLabel>
                          <FormControl>
                            <RadioGroup
                              defaultValue='DISEL'
                              className='flex gap-9'
                              {...rest}
                              onValueChange={(val: string) => {
                                console.log(val, 'val');
                                onChange(val);
                              }}
                            >
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='DISEL' id='option-one' />
                                <Label
                                  htmlFor='option-one'
                                  className='font-light text-black'
                                >
                                  DISEL
                                </Label>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='GAS' id='option-two' />
                                <Label
                                  htmlFor='option-two'
                                  className='font-light text-black'
                                >
                                  GAS
                                </Label>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  value='ELECTRIC'
                                  id='option-three'
                                />
                                <Label
                                  htmlFor='option-three'
                                  className='font-light text-black'
                                >
                                  ELECTRIC
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='no_of_seats'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> No of Seats </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter no of seats'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='location_id'
                    render={({ field: { onChange, ...rest } }) => {
                      return (
                        <FormItem>
                          <FormLabel> Location </FormLabel>
                          <FormControl>
                            <Select onValueChange={(value) => onChange(value)}>
                              <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='Select Location' />
                              </SelectTrigger>
                              <SelectContent>
                                {location?.location.map((item: any) => (
                                  <SelectItem
                                    {...rest}
                                    key={item.location_id}
                                    value={`${item.location_id}`}
                                  >
                                    {item.location_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='color'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Color </FormLabel>
                        <FormControl>
                          <Input placeholder='Enter Color' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='Total_km'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Total Kilometer </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter Total Kilometer'
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
                  name='car_images'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car image</FormLabel>
                      <FormControl>
                        <MultipleImageDropzone
                          files={carImage}
                          setFiles={setCarImage}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bluebook_image'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bluebook Images</FormLabel>
                      <FormControl>
                        <MultipleImageDropzone
                          files={bluebookImage}
                          setFiles={setBlueBookImage}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='insurance_image'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Images</FormLabel>
                      <FormControl>
                        <MultipleImageDropzone
                          files={insuranceImage}
                          setFiles={setInsuranceImage}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h1 className='mt-8 mb-4 font-bold'>Pricing Information</h1>
                <div className='gap-4 grid grid-cols-1 md:grid-cols-2 my-3'>
                  <FormField
                    control={form.control}
                    name='pricing_per_hour'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per hour</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter price per hour'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='pricing_per_four_hour'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per four hour</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter price per four hour'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='gap-4 grid grid-cols-1 md:grid-cols-2 my-3'>
                  <FormField
                    control={form.control}
                    name='pricing_per_eight_hour'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per eight hour</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter price per eight hour'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='pricing_per_day'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per day</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter price per day'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex justify-    center mt-[10px]'>
                  <Button
                    data-cy='submit'
                    className='  border-2 sm:mt-[0px] mt-[10px]'
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CarHostingPage;
