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
import React, { useState } from 'react';
import useAddCarForHosting from './hooks/useAddCarForHosting';
import InputSelect from '@/components/ui/input-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FuelType } from '@prisma/client';
import MultipleImageDropzone from '@/components/ui/multi-image-dropzone/multi-image-dropzone';
import { PreviewFileType } from '@/types/preview-file-types';

const CarHostingPage = () => {
  const [carImage, setCarImage] = useState<PreviewFileType[]>([]);
  const [bluebookImage, setBlueBookImage] = useState<PreviewFileType[]>([]);
  const [insuranceImage, setInsuranceImage] = useState<PreviewFileType[]>([]);
  const options = [
    {
      value: 1,
      label: 'A/C',
    },
    {
      value: 2,
      label: 'Music',
    },
  ];

  const { form } = useAddCarForHosting();
  return (
    <div className='p-[20px]'>
      <h1 className='text-[24px] font-medium'>Vehicle</h1>
      <div className='flex my-[10px] gap-8'>
        <div className='flex flex-col gap-4 w-[30%]'>
          <label>1. General Information</label>
          <label>2. Vehicle Image</label>
          <label>3. Address Information</label>
          <label>4. Pricing Information</label>
          <label>5. Guest Information</label>
        </div>

        <div className='w-[60%] bg-gray py-[10px]'>
          <Form {...form}>
            <form
              //onSubmit={form.handleSubmit(submit)}
              className='flex flex-col gap-[30px]  '
            >
              <div className=' p-[15px] ml-[20px]'>
                <h1 className='mb-[10px] font-bold'>General Information</h1>
                <div className='gap-[20px] grid grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='onwerName'
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
                        <InputSelect
                          placeholder='Search here to add features'
                          isMulti
                          {...field}
                          options={options.map((items) => {
                            items.label;
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='gap-[20px] grid grid-cols-2 my-3'>
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
                              onValueChange={(val: FuelType) => {
                                onChange(val);
                                //form.setValue('isBrandSelected', val === 'SELECTED');
                              }}
                            >
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  value='SELECTED'
                                  id='option-one'
                                />
                                <Label
                                  htmlFor='option-one'
                                  className='font-light text-black'
                                >
                                  DISEL
                                </Label>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem value='ALL' id='option-two' />
                                <Label
                                  htmlFor='option-two'
                                  className='font-light text-black'
                                >
                                  GAS
                                </Label>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  value='OTHERS'
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
                  name='car_image'
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
                {/* <div className='gap-[20px] grid grid-cols-2 my-3'>
                  <FormField
                    control={form.control}
                    name='insurance_valid_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Valid year </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter your email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                <div className='gap-[20px] grid grid-cols-2 my-3'>
                  <FormField
                    control={form.control}
                    name='pricing_per_hour'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Pricing per hour </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter your email'
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
                        <FormLabel> Pricing per four hour </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter your email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='pricing_per_eight_hour'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Pricing per eight hour </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter your email'
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
                        <FormLabel> Pricing per day </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter your email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/*
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
                /> */}

                <div className='flex justify-    center mt-[10px]'>
                  <Button
                    variant='secondary'
                    className=' bg-purple border-2 sm:mt-[0px] mt-[10px]'
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
