import React from 'react';
import Modal from '../ui/modal';
import { Button } from '../ui/button';

const VerifyHostiong = ({ handleToggleModal, open, data }) => {
  console.log('🚀 ~ VerifyHostiong ~ data:', data);
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
              Owner Name
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px]'>
              {data?.onwerName}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>
              Manufacture
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.manufacture}
            </p>
          </div>
          <div className='flex flex-col'>
            <label className='text-[16px] font-light text-black3'>
              Category
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.category_id}
            </p>
          </div>
          <div className='flex flex-col'>
            <label className='text-[16px] font-light text-black3'>
              Registration Number
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.registration_num}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>
              Features
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.features}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>Fuel</label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.fuel_Type}
            </p>
          </div>
        </div>

        <div className='mt-[44px]'>
          <label className='text-black text-[16px] font-light'>
            Car Images
          </label>
          <div className='flex gap-8 mt-3'>
            {data?.car_images.map((image, index) => (
              <img key={index} src={image} width={200} />
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-[44px] mt-[43px]'>
          <div>
            <label className='text-[16px] font-light text-black'>
              No of Seats
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px]'>
              {data?.no_of_seats}
            </p>
          </div>
          <div>
            <label className='text-[16px] font-light text-black'>
              Location
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.location_id}
            </p>
          </div>
          <div className='flex flex-col'>
            <label className='text-[16px] font-light text-black3'>Color</label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.color}
            </p>
          </div>
          <div className='flex flex-col'>
            <label className='text-[16px] font-light text-black3'>
              Total Kilometer
            </label>
            <p className='text-black text-[14px] font-normal mt-[8px] capitalize'>
              {data?.Total_km}
            </p>
          </div>
        </div>
        <div className='mt-[44px]'>
          <label className='text-black text-[16px] font-light'>
            Bluebook Images
          </label>
          <div className='flex gap-8 mt-3'>
            {data?.bluebook_images.map((image, index) => (
              <img key={index} src={image} width={200} />
            ))}
          </div>
        </div>
        <div className='mt-[44px]'>
          <label className='text-black text-[16px] font-light'>
            Insurance Images
          </label>
          <div className='flex gap-8 mt-3'>
            {data?.insurance_images.map((image, index) => (
              <img key={index} src={image} width={200} />
            ))}
          </div>
        </div>
        <div className='mt-[48px]'>
          <table className=' w-[100%]'>
            <tr>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Pricing Per Hour
              </th>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Pricing Per 4 hour
              </th>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Pricing Per 8 hour
              </th>
              <th className='border border-gray-400 py-2 px-4 font-light'>
                Pricing Per Day
              </th>
            </tr>
            <tr>
              <td className='border border-gray-400 text-[14px] font-normal  text-center py-2 px-4'>
                {data?.pricing_per_hour}
              </td>
              <td className='border border-gray-400 text-[14px] font-normal py-2 px-4 text-center'>
                {data?.pricing_per_four_hour}
              </td>
              <td className='border border-gray-400 text-[14px] font-normal  py-2 px-4 text-center'>
                {data?.pricing_per_eight_hour}
              </td>
              <td className='border border-gray-400 text-[14px] font-normal  py-2 px-4 text-center'>
                {data?.pricing_per_day}
              </td>
            </tr>
          </table>
          <div className='mt-[20px] flex justify-center'>
            <Button onClick={handleCLose}>Close</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyHostiong;
