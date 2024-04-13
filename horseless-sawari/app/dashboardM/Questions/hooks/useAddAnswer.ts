import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useAddAnswer = (id) => {
  const submit = async (values) => {
    console.log('🚀 ~ file: useSignupForm.ts:38 ~ submit ~ values:', values);
    try {
      const response = await fetch(`/api/answer?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: values.answer,
        }),
      });
      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Error has occurred',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your Answer is submitted',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred in your Profile', error);
    }
  };
  return { submit };
};

export default useAddAnswer;
