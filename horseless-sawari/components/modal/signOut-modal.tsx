import React from 'react';
import Modal from '../ui/modal';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/lib/utils';

const SignOutModal = ({ open, onClose, title, className }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn('p-0 max-w-[500px]', className)}>
        <div className='p-[30px]'>
          <h3 className='text-center text-[20px] font-normal text-black mt-10'>
            Are you sure want to {title}?
          </h3>
          <div className='flex justify-center gap-5 mt-[50px]'>
            <Button
              type='submit'
              className='border border-purple '
              onClick={() => {
                signOut({
                  redirect: true,
                  callbackUrl: '/login',
                });
                localStorage.removeItem('user_id');
                localStorage.removeItem('email');
              }}
              // variant='outline'
            >
              Sign Out
            </Button>

            <Button type='button' className='bg-purple' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutModal;
