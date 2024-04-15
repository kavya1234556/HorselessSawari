import React from 'react';

const useGetTotalBookedCar = async () => {
  const response = await fetch('/api/dashboard/total_count/total_booked_car');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      console.log('Error');
    }
  }
  return data;
};

export default useGetTotalBookedCar;
