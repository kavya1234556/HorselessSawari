import React from 'react';

const useGetTotalCategory = async () => {
  const response = await fetch('/api/dashboard/total_count/total_category');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      console.log('Error');
    }
  }
  return data;
};

export default useGetTotalCategory;
