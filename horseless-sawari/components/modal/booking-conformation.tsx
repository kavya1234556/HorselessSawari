import React from 'react';
import Modal from '../ui/modal';

const BookingConformation = ({ handleToggleModal, open }) => {
  const handleCLose = () => {
    handleToggleModal();
  };
  return (
    <Modal
      title='Confrim Booking'
      className='font-bold max-w-[750px] h-[60%]'
      isOpen={open}
      onClose={handleCLose}
    >
      <div>Heelo</div>
    </Modal>
  );
};

export default BookingConformation;
