import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useEditUserRole = (id: number) => {
  const submit = async (values) => {
    console.log('🚀 ~ submit ~ values:', values.role);
    try {
      const response = await fetch(`/api/dashboard/users?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: values.role,
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
          description: 'Role is updated successfully',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { submit };
};

export default useEditUserRole;
