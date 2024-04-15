import React from 'react';

const useGetAllTransactions = async () => {
  const response = await fetch('/api/dashboard/transactions');
  const data = await response.json();
  return data;
};

export default useGetAllTransactions;
