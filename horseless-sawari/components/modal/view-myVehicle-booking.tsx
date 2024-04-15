import React, { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import useGetEachBookingDetail from '@/app/profile/my-booking/hooks/useGetEachBookingDetail';

const ViewMyVehichleBooking = ({ handleToggleModal, open, data }) => {
  console.log(data);
  const [BookData, setBookData] = useState(null);
  console.log('BookData', BookData);
  const BookingData = useGetEachBookingDetail(data?.car_id);
  useEffect(() => {
    BookingData.then((item) => {
      setBookData(item);
    });
  }, []);
  const handleCLose = () => {
    handleToggleModal();
  };
  return (
    <Modal
      title='Booking Detail'
      className='font-bold  h-[75%] overflow-auto'
      isOpen={open}
      onClose={handleCLose}
    >
      <div className='bg-white px-[60px] pt-[16px] pb-[48px]'>
        <div className='grid grid-cols-2 gap-[44px] mt-[43px]'>
          <div>
            <label className='text-[16px] font-light text-black'>
              Pick Up location
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px]'>
              {data?.pickUpLocation}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>
              Drop Off Location
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.dropOffLoction}
            </p>
          </div>
          <div className='flex flex-col'>
            <label className='text-[16px] font-light text-black3'>
              Pick up date
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.pickUpDate.split('T')[0]}
            </p>
          </div>
          <div className='flex flex-col'>
            <label className='text-[16px] font-light text-black3'>
              Drop off date
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.dropOffDate.split('T')[0]}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>
              Pick Up Time
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.pickUpTime}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>
              Drop Of Time
            </label>

            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.dropOffTime}
            </p>
          </div>
        </div>

        <div className='mt-[48px]'>
          <table className=' w-[100%]'>
            <tr>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Total Charge
              </th>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Service Charge
              </th>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Total With Service Charge
              </th>
            </tr>
            <tr>
              <td className='border border-gray-400 text-[14px] font-normal  text-center py-2 px-4'>
                {data?.totalPrice}
              </td>
              <td className='border border-gray-400 text-[14px] font-normal py-2 px-4 text-center'>
                {data?.sharingCharge}
              </td>
              <td className='border border-gray-400 text-[14px] font-normal  py-2 px-4 text-center'>
                {data?.serviceWithCharge}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default ViewMyVehichleBooking;
