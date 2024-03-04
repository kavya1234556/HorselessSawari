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
  const [location, setLocation] = useState(null);
  console.log('Location', location);
  console.log(location);
  const interval = 30;
  const startDate = 60 * 7;
  const endDate = 60 * 21;
  const dateList = generateHoursInterval(startDate, endDate, interval);
  console.log('dateList', dateList);
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
        console.log('loc_data', loc_data);
        setLocation(loc_data);
      }
    });
  }, []);
  return (
    <Form {...form}>
      <div className='pt-[10px] pl-[20px]'>Book a vehicle</div>
      <form>
        <div className='flex gap-[10px] p-[20px]'>
          <FormField
            control={form.control}
            name='location_id'
            render={({ field: { onChange, ...rest } }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={(value) => onChange(value)}>
                      <SelectTrigger className='w-[180px] bg-white1 h-[40px]'>
                        <SelectValue placeholder='Select Location' />
                      </SelectTrigger>
                      <SelectContent>
                        {location?.location_data_final.map((item: any) => (
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
            name='pickUpDate'
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
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
            render={({ field: { onChange, ...rest } }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={(value) => onChange(value)}>
                      <SelectTrigger className='w-[180px] bg-white1 h-[40px]'>
                        <SelectValue placeholder='Pick up Time' />
                      </SelectTrigger>
                      <SelectContent>
                        {dateList?.map((time: any, index) => (
                          <SelectItem {...rest} key={index} value={time}>
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
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
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
            render={({ field: { onChange, ...rest } }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={(value) => onChange(value)}>
                      <SelectTrigger className='w-[180px] bg-white1 h-[40px]'>
                        <SelectValue placeholder='Drop off Time' />
                      </SelectTrigger>
                      <SelectContent>
                        {dateList?.map((time: any, index) => (
                          <SelectItem {...rest} key={index} value={time}>
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
