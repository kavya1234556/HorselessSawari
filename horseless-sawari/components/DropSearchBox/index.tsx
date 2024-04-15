// @ts-nocheck
'use client';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
export interface IBookingType {
  dropOffLocation: string;
}
const params = {
  q: '',
  format: 'json',
  addressdetails: 'addressdetails',
};
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';
const DropSearchBox = ({ selectPostion, setSelectedPosition }) => {
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);
  const bookingSchema = yup.object().shape({
    dropOffLocation: yup.string().required(),
  });
  const form = useForm<IBookingType>({
    resolver: yupResolver(bookingSchema) as any,
    defaultValues: {
      dropOffLocation: '',
    },
  });
  const submit = (value) => {
    console.log('value', value);
    const params = {
      q: value.dropOffLocation,
      format: 'json',
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log('err', err));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div>
          <div className='flex items-end'>
            <div className='w-[90%]'>
              <FormField
                control={form.control}
                name='dropOffLocation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drop off Location</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter drop off location' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button>Search</Button>
          </div>
          <div className='flex flex-col  h-[100px] overflow-auto'>
            {listPlace.map((item) => {
              return (
                <div
                  key={item?.place_id}
                  className='w-[90%] flex flex-col gap-3 p-4 '
                >
                  <ul className='list-none'>
                    <li onClick={() => setSelectedPosition(item)}>
                      {item.display_name}
                    </li>
                    <hr />
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DropSearchBox;
