import React from 'react';
import Modal from '../ui/modal';

const VerifyHostiong = ({ handleToggleModal, open, data }) => {
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
      <div className='bg-white px-[60px] pt-[16px] pb-[48px]'>Heelo</div>
    </Modal>
  );
};

export default VerifyHostiong;
