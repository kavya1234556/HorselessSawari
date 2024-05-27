'use client';
import '@/app/pagination.css';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useGetCarByLocation from './hooks/useGetCarByLocation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BookingCard from '@/components/bookingCard';
import useGetCarByCategory from './hooks/useGetCarByCategory';
import { Checkbox } from '@/components/ui/checkbox';
import ReactPaginate from 'react-paginate';
import NotAvailablePage from '../not-available/page';

const VehiclesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location_id = parseInt(searchParams.get('location_id'));
  const category_id = parseInt(searchParams.get('category_id'));

  const [locationData, setLocationData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [locData, setLocData] = useState(null);
  console.log('🚀 ~ VehiclesPage ~ locData:', locData);
  const [catData, setCatData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  console.log('🚀 ~ VehiclesPage ~ categoryData:', categoryData);

  useEffect(() => {
    const fetchLocationData = async () => {
      const response = await fetch('/api/dashboard/location');
      const data = await response.json();
      setLocationData(data);
    };

    const fetchCategoryData = async () => {
      const response = await fetch('/api/manufacture');
      const data = await response.json();
      setCategoryData(data);
    };

    fetchLocationData();
    fetchCategoryData();
  }, []);

  const locationDatas = useGetCarByLocation(location_id);
  const categoryDatas = useGetCarByCategory(category_id);

  useEffect(() => {
    locationDatas.then((data) => {
      setLocData(data);
    });
    categoryDatas.then((data) => {
      setCatData(data);
    });
  }, [searchParams]);

  const handleLocationChange = (item) => {
    router.push(`/vehicles?location_id=${item.location_id}`);
  };

  const handleCategoryChange = (item) => {
    router.push(`/vehicles?category_id=${item.category_id}`);
  };

  const combinedData = locData?.car_data_final || catData?.car_data_final || [];
  const pageCount = Math.ceil(combinedData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayCars = combinedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(displayCars.length, 'displayCars');
  return (
    <>
      <div className='w-[87%] m-auto p-[15px] bg-theme'>
        <BookingCard />
      </div>
      <div className='flex flex-col sm:flex-row gap-4 p-[30px] w-[100%]'>
        <div className='w-[100%] sm:w-[25%] bg-theme p-[24px]'>
          <h1 className='font-bold text-center'>Filters</h1>

          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold'>Location</h1>
            {locationData?.location_data_final?.map((item, index) => (
              <div key={index} className='flex items-center gap-2 '>
                <Checkbox onClick={() => handleLocationChange(item)} />
                <h1>{item.location_name}</h1>
              </div>
            ))}
          </div>
          <hr className='w-64 h-1 my-8 bg-purple border-0 rounded' />
          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold'>Category</h1>
            {categoryData?.category_data_final?.map((item, index) => (
              <div key={index} className='flex items-center gap-2 '>
                <Checkbox onClick={() => handleCategoryChange(item)} />
                <h1>{item.category_name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full lg:w-[75%]'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
            {displayCars.length === 0 ? (
              <NotAvailablePage />
            ) : (
              displayCars.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    router.push(`/vehicle?car_id=${item.carID}`);
                  }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{item.manufacture}</CardTitle>
                      <CardDescription>
                        <img
                          src={`${item.car_images[0]}`}
                          alt='Car Image'
                          className='w-full max-w-md rounded-lg'
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-2'>
                        <p>Feature: {item.features}</p>
                        <p>Fuel Type: {item.fuel_Type}</p>
                        <p>Color: {item.color}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className='w-[100%] pr-[10px]'>
                        <hr />
                        <p className='text-right'>{`${item.pricing_per_day} per/Day`}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))
            )}
          </div>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </>
  );
};

export default VehiclesPage;
