'use client';
import DashboardLink from '@/components/dashboradLinks/page';
import useGetTotalTransaction from './hooks/useGetTotalTransaction';
import { useEffect, useState } from 'react';
import useGetTotalUser from './hooks/useGetTotalUser';
import useGetTotalBookedCar from './hooks/useGetTotalBookedCar';
import useGetTotalVerifiedCar from './hooks/useGetTotalVerifiedCar';
import useGetTotalLocation from './hooks/useGetTotalLocation';
import useGetTotalCategory from './hooks/useGetTotalCategory';

const BlueCard = ({ title, value }) => {
  return (
    <div className=' bg-purple p-[24.5px] rounded'>
      <p className='text-white text-[20px] capitalize font-normal leading-normal'>
        {title}
      </p>
      <p className='text-white text-[96px] font-bold leading-[100px] mt-[4.5px] '>
        {value}
      </p>
    </div>
  );
};

const WhiteCard = ({ title, value }) => {
  return (
    <div className=' bg-white p-[24.5px] rounded'>
      <p className='text-gray1 text-[18px] font-normal leading-normal'>
        {title}
      </p>
      <p className='text-blue text-[96px] font-bold leading-[100px] mt-[8.5px]'>
        {value}
      </p>
    </div>
  );
};

const DashboardPage = () => {
  const [tran, settran] = useState(null);
  const [user, setUser] = useState(null);
  const [bookedCar, setBookedCar] = useState(null);
  const [car, setCar] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const transaction = useGetTotalTransaction();
    transaction.then((data) => settran(data));

    const Users = useGetTotalUser();
    Users.then((data) => setUser(data));

    const BookedCars = useGetTotalBookedCar();
    BookedCars.then((data) => setBookedCar(data));

    const Cars = useGetTotalVerifiedCar();
    Cars.then((data) => setCar(data));

    const locations = useGetTotalLocation();
    locations.then((data) => setLocation(data));

    const categories = useGetTotalCategory();
    categories.then((data) => setCategory(data));
  }, []);
  return (
    <div className='flex '>
      <div className='w-[25%]'>
        <DashboardLink />
      </div>
      <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
        <div className='grid grid-cols-3  gap-[34px]'>
          <BlueCard title='Total User' value={user?.total_user} />
          <BlueCard title='Booked Cars' value={bookedCar?.total_booked_car} />
          <BlueCard title='Hosted Cars' value={car?.verified_car_count} />
        </div>
        <div className='grid grid-cols-3  gap-[34px]'>
          <WhiteCard
            title='Total Trasanction'
            value={tran?.transaction_count}
          />
          <WhiteCard title='Total Location' value={location?.location_count} />
          <WhiteCard title='Total Category' value={category?.category_count} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
