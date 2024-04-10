import React from 'react';

const useGetTotalLocation = async () => {
  const response = await fetch('/api/dashboard/total_count/total_location');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      console.log('Error');
    }
  }
  return data;
};

export default useGetTotalLocation;