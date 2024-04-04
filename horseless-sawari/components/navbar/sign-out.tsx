'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import SignOutModal from '../modal/signOut-modal';

const SignOut = () => {
  const [open, setOpen] = useState(false);
  const handleToggleModal = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Button onClick={handleToggleModal}>SignOut</Button>
      <SignOutModal
        onClose={handleToggleModal}
        open={open}
        title='Sign Out'
        className='p-3'
      />
    </>
  );
};

export default SignOut;
