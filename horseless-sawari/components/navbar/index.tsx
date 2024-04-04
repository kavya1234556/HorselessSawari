import Logo from '@/assests/logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SignOut from './sign-out';

const Navbar = async () => {
  const session = await getServerSession(options);
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'white',
      }}
    >
      <div className='flex justify-between items-center shadow-lg px-4 py-3 '>
        <div>
          <Link href='/'>
            <Logo />
          </Link>
        </div>

        <div className='flex flex-row justify-end items-center px-4 py-3 gap-6 '>
          {session?.user?.role == 'USER' ? (
            <>
              <Link href='/car-hosting'>Host Your Car</Link>
              <Link href='/profile'>My Profile</Link>
              <Link href='/car-pooling'>Carpool</Link>
              <SignOut />
            </>
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
      </div>
    </div>
  );
};

export default Navbar;
