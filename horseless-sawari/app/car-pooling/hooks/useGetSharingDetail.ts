import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useGetSharingDetail = async () => {
  const response = await fetch('/api/sharing');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      toast({
        title: 'error',
        description: 'No data Avaiable in car sharing ',
      });
    }
  }
  return data;
};

export default useGetSharingDetail;
