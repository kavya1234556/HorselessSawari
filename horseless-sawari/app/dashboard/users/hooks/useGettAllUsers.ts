import React from 'react';

const useGettAllUsers = async () => {
  const response = await fetch('/api/dashboard/users');
  const data = await response.json();
  return { data };
};

export default useGettAllUsers;
