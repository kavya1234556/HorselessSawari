import { toast } from '@/components/ui/use-toast';
import React from 'react';

const useAddSharingDetail = async (item, id) => {
  try {
    const response = await fetch(`/api/sharing?id=${id}`, {
      method: 'POST',
      body: JSON.stringify({
        share_price: item.ServiceCharge,
        booked_car_id: item.booked_car_id,
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
        description: 'Password changed successfully',
      });
      // router.push('/login');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
  } catch (e) {
    console.error('An error occurred while changing password:', e);
  }
};

export default useAddSharingDetail;
