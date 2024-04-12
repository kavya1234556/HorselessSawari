import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useGetAllQuestion = async () => {
  const response = await fetch('/api/question');
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

export default useGetAllQuestion;
