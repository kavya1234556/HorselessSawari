'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  return (
    <Button
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: '/login',
        });
        localStorage.removeItem('user_id');
        localStorage.removeItem('email');
      }}
    >
      SignOut
    </Button>
  );
};

export default SignOut;
