import React from 'react';

const useGetTotalVerifiedCar = async () => {
  const response = await fetch('/api/dashboard/total_count/total_verified_car');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      console.log('Error');
    }
  }
  return data;
};

export default useGetTotalVerifiedCar;
