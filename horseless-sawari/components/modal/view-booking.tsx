import React, { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import useGetEachBookingDetail from '@/app/profile/my-booking/hooks/useGetEachBookingDetail';

const ViewBooking = ({ handleToggleModal, open, data }) => {
  console.log(data?.share_car_data?.map((value) => value.car_id));
  const [BookData, setBookData] = useState(null);
  // console.log('BookData', BookData);
  const BookingData = useGetEachBookingDetail(data.car_id);
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
      className='font-bold  h-[75%]'
      isOpen={open}
      onClose={handleCLose}
    >
      {data.share_car_data.map((item) => (
        <div>heello: {item.dropOffLoction}</div>
      ))}
    </Modal>
  );
};

export default ViewBooking;
