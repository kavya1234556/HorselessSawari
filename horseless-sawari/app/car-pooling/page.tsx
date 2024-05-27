'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import useGetSharingDetail from './hooks/useGetSharingDetail';
import { Button } from '@/components/ui/button';
import useAddSharingDetail from './hooks/useAddSharingDetail';
import ReactPaginate from 'react-paginate';
import '@/app/pagination.css';

const CarpoolPage = () => {
  const [shareData, setShareData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const UserId =
    typeof window !== 'undefined' && localStorage
      ? parseInt(localStorage.getItem('user_id'))
      : null;
  const SharingData = useGetSharingDetail();

  useEffect(() => {
    SharingData.then((data) => {
      setShareData(data?.share_car_data || []);
    });
  }, []);

  const HandleSharing = (item) => {
    useAddSharingDetail(item, UserId);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = shareData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(shareData.length / itemsPerPage);

  return (
    <div className='bg-theme p-4 md:p-8'>
      <div className='py-6'>
        <h1 className='font-semibold text-center text-lg md:text-3xl'>
          &quot;Seamless Travel,Where Rides Meet Ease!&quot;
        </h1>
        <h2 className='font-bold text-center text-2xl md:text-4xl'>
          Rental Sawari
        </h2>
        <h3 className='text-center text-sm md:text-lg font-medium'>
          &quot;Drive Greener, Save Green: Carpool with Rental Sawari for
          Cleaner Air and Clearer Roads!&quot;
        </h3>
      </div>
      <h1 className='text-lg md:text-xl font-medium'>Carpool Request</h1>
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {currentPageData.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardDescription>
                <img
                  src={`${item.car_images[0]}`}
                  alt='Car Image'
                  className='w-full rounded-lg'
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <p>
                  <span className='font-medium'>Pick Up Date:</span>{' '}
                  {item.pickUpDate.split('T')[0]}
                </p>
                <p>
                  <span className='font-medium'>Drop Off Date:</span>{' '}
                  {item.dropOffDate.split('T')[0]}
                </p>
                <p>
                  <span className='font-medium'>Pick Up Location:</span>{' '}
                  {item.pickUpLocation}
                </p>
                <p>
                  <span className='font-medium'>Drop Off Location:</span>{' '}
                  {item.dropOffLoction}
                </p>
              </div>
            </CardContent>
            <CardContent>
              <hr />
              <div className='flex flex-col gap-2 mt-3'>
                <p>
                  <span className='font-medium'>Pick Up Time:</span>{' '}
                  {item.pickUpTime}
                </p>
                <p>
                  <span className='font-medium'>Drop Off Time:</span>{' '}
                  {item.dropOffTime}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className='w-full pr-4'>
                <hr />
                <p className='pt-2'>
                  <span className='font-medium'>Charge:</span>{' '}
                  {item.sharingCharge}
                </p>
              </div>
            </CardFooter>
            <div className='flex justify-end p-4'>
              <Button onClick={() => HandleSharing(item)}>Accept</Button>
            </div>
          </Card>
        ))}
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
  );
};

export default CarpoolPage;
