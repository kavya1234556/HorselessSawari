import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useGetEachBookingDetail = async (id: number) => {
  const response = await fetch(`/api/car-booking?car_id=${id}`);
  const data = await response.json();
  if (response.ok) {
    if (response.status === 200) {
      toast({
        title: 'Success',
      });
    }
  } else {
    toast({
      title: 'Error',
      description: 'Something went wrong',
    });
  }
  return data;
};

export default useGetEachBookingDetail;
