import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useGetCarDetail = async () => {
  const response = await fetch('/api/dashboardM');
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

export default useGetCarDetail;
