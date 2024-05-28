'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import * as yup from 'yup';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import generateHoursInterval from '../ui/generateHoursInterval ';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/dropdown';
import {
  setDropOffDate,
  setDropOffTime,
  setLocationID,
  setPickUpDate,
  setPickUpTime,
} from '@/redux/reducers/booking';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export interface IRegistrationType {
  location_id: Number;
  dropOffTime: String;
  pickUpTime: String;
  pickUpDate: Date;
  dropOffDate: Date;
}

const RegisterSchema = yup.object().shape({
  location_id: yup.number().required('Location is required'),
  dropOffTime: yup.string().required('Drop off Time is is required'),
  pickUpTime: yup.string().required('Drop off Time is is required'),
  pickUpDate: yup.date().required('Pickup Date is required'),
  dropOffDate: yup.date().required('Drop off Date is required'),
});
const BookingCard = () => {
  const router = useRouter();
  const dispatch = useDispatch(); //for setting value in the reducer
  const [location, setLocation] = useState(null);
  const interval = 30;
  const startDate = 60 * 7;
  const endDate = 60 * 21;
  const dateList = generateHoursInterval(startDate, endDate, interval); //for the 11:00, 11:130,... list
  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  useEffect(() => {
    const location_data = async () => {
      const response = await fetch('/api/dashboard/location');
      const data = await response.json();
      return data;
    };
    const data = location_data();
    data.then((loc_data) => {
      if (loc_data) {
        setLocation(loc_data);
      }
    });
  }, []);
  const submit = (values: IRegistrationType) => {
    dispatch(setLocationID(values.location_id));
    dispatch(setPickUpDate(values.pickUpDate));
    dispatch(setPickUpTime(values.pickUpTime));
    dispatch(setDropOffDate(values.dropOffDate));
    dispatch(setDropOffTime(values.dropOffTime));

    router.push(`/vehicles?location_id=${values.location_id}`);
  };
  //setting the value in the state of the booking reducer

  const location_id = useSelector(
    (state: any) => state.booking.value.location_id
  );
  const pickUpDate = useSelector(
    (state: any) => state.booking.value.pickUpDate
  );

  const pickUpTime = useSelector(
    (state: any) => state.booking.value.pickUpTime
  );
  const dropOffDate = useSelector(
    (state: any) => state.booking.value.dropOffDate
  );
  const dropOffTime = useSelector(
    (state: any) => state.booking.value.dropOffTime
  ); //for using the value initialized in the booking reducer
  useEffect(() => {
    form.setValue('location_id', location_id);
    form.setValue('pickUpDate', pickUpDate);
    form.setValue('pickUpTime', pickUpTime);
    form.setValue('dropOffDate', dropOffDate);
    form.setValue('dropOffTime', dropOffTime);
  }, [location_id]); //setting the value in the form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='flex-col gap-[30px] p-[20px] mb-6 sm:mb-0 sm:flex sm:flex-row sm:overflow-auto'>
          <FormField
            control={form.control}
            name='location_id'
            render={({ field }) => (
              <FormItem className='mb-3 sm:mb-0'>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className='w-full sm:w-300  bg-white h-10'>
                      <SelectValue placeholder='Select Location' />
                    </SelectTrigger>
                    <SelectContent>
                      {location?.location_data_final.map((item: any) => (
                        <SelectItem
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
            )}
          />
          <FormField
            control={form.control}
            name='pickUpDate'
            render={({ field }) => (
              <FormItem className='mb-3 sm:mb-0'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full sm:w-300  pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date('2024-12-20') || date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='pickUpTime'
            render={({ field }) => {
              return (
                <FormItem className='mb-3 sm:mb-0'>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className=' w-full sm:w-300  bg-white1 h-[40px]'>
                        <SelectValue placeholder='Pick up Time' />
                      </SelectTrigger>
                      <SelectContent>
                        {dateList?.map((time: any, index) => (
                          <SelectItem {...field} key={index} value={time}>
                            {time}
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
            name='dropOffDate'
            render={({ field }) => (
              <FormItem className='mb-3 sm:mb-0'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full sm:w-300  pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date('2024-12-20') || date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dropOffTime'
            render={({ field }) => {
              return (
                <FormItem className='mb-3 sm:mb-0'>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className=' w-full sm:w-300 bg-white1 h-[40px]'>
                        <SelectValue placeholder='Drop off Time' />
                      </SelectTrigger>
                      <SelectContent>
                        {dateList?.map((time: any, index) => (
                          <SelectItem {...field} key={index} value={time}>
                            {time}
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
          <Button>Search</Button>
        </div>
      </form>
    </Form>
  );
};

export default BookingCard;
