'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import SignOut from '../sign-out';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Links = () => {
  const { data: session, status } = useSession();
  const display = false;

  // const session = await getServerSession(options);

  return (
    <div className='flex flex-row justify-end items-center px-4 py-3 gap-6'>
      {session?.user?.role === 'USER' ? (
        <nav className='bg-white border-gray-200 dark:bg-gray-900'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <button
              data-collapse-toggle='navbar-default'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-default'
              aria-expanded={display}
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 17 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M1 1h15M1 7h15M1 13h15'
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-[50px]'>
                  <DropdownMenuItem className='text-[15px]'>
                    <Link href='/car-hosting'>Host Your Car</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-[15px]'>
                    <Link href='/profile'>My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-[15px]'>
                    <Link href='/car-pooling'>Carpool</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-[15px]'>
                    <Link href='/faq'>FAQ</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </button>
            <div
              className={`${
                display ? 'block' : 'hidden'
              } w-full md:block md:w-auto`}
              id='navbar-default'
            >
              <ul className='font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                <li>
                  <Link href='/car-hosting'>Host Your Car</Link>
                </li>
                <li>
                  <Link href='/profile'>My Profile</Link>
                </li>
                <li>
                  <Link href='/car-pooling'>Carpool</Link>
                </li>
                <li>
                  <Link href='/faq'>FAQ</Link>
                </li>
                <li>
                  <SignOut />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <>
          {session ? (
            <SignOut />
          ) : (
            <Link href='/login'>
              <Button variant='outline' className='border-2 border-purple'>
                Sign in
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default Links;
