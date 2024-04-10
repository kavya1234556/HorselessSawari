import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useGetTotalUser = async () => {
  const response = await fetch('/api/dashboard/total_count/total_user');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      console.log('Error');
    }
  }
  return data;
};

export default useGetTotalUser;
