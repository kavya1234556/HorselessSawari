import Link from 'next/link';

const DeniedPage = () => {
  return (
    <div className='h-[100vh] flex items-start justify-center pt-20 sm:px-6 lg:px-8'>
      <div className='max-w-md  w-[40%] mx-auto bg-theme p-8 rounded-lg shadow-lg text-center'>
        <h1 className='text-5xl text-red-600 mb-6'>Access Denied</h1>
        <p className='text-xl text-gray-800 mb-6 text-center max-w-lg'>
          You are logged in, but you do not have the required access to view
          this page.
        </p>
        <Link href='/' className='text-3xl underline'>
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default DeniedPage;
