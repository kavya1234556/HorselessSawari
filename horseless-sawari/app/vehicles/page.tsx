'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import useGetCarByLocation from './hooks/useGetCarByLocation';

const VehiclesPage = () => {
  const searchParams = useSearchParams();
  const location_id = parseInt(searchParams.get('location_id'));
  console.log('🚀 ~ VehiclesPage ~ location_id:', location_id);
  useEffect(() => {
    const locationData = useGetCarByLocation(location_id);
    locationData.then((data) => {
      console.log(data);
    });
  });
  return <div>page</div>;
};

export default VehiclesPage;
