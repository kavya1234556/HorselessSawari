import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useAddQuestion = (id) => {
  const submit = async (values) => {
    console.log('🚀 ~ file: useSignupForm.ts:38 ~ submit ~ values:', values);
    try {
      const response = await fetch(`/api/question?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: values.question,
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
          description: 'Your Question is submitted',
        });
        window.location.reload();
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
export default useAddQuestion;
