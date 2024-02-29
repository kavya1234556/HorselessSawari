import main from 'public/images/main.png';
import BookingCard from '@/components/bookingCard';

const ReservationPage = () => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${main.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '80vh',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'column',
        // zIndex: 999,
      }}
    >
      <div className='m-auto text-white1 sm:text-[33px] text-[20px] p-[27px] font-bold text-center'>
        Unlock freedom, Get on the Road-Share the Adventure.
        <div className='sm:text-[24px] text-[20px] text-white1'>
          Budget Nepal Car Rental
        </div>
      </div>
      <div className='w-[95%] m-auto bg-gray p-[15px]'>
        <BookingCard />
      </div>
    </div>
  );
};

export default ReservationPage;
