import Logo from '@/assests/logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SignOut from './sign-out';

const Navbar = async () => {
  const session = await getServerSession(options);
  return (
    <div className='flex flex-row justify-between items-center shadow-lg px-6 py-4'>
      <Link href='/'>
        <Logo />
      </Link>

      {session?.user ? (
        <>
          <Link href='/profile'>My Profile</Link>
          <SignOut />
        </>
      ) : (
        <>
          <Link href='/login'>
            <Button variant='outline' className='border-2 border-purple'>
              Sign in
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
