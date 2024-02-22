import Image from 'next/image';

const Hero = () => {
  return (
    <div className='flex xl:flex-row flex-col gap-5 relative z-0 max-w-[100%] mx-auto max-h-[50%] shadow-md '>
      <div className='flex-1 pt-10 px-10'>
        <h1 className='2xl:text-[62px] sm:text-[54px] text-[40px] font-extrabold'>
          Find, book, rent a car—quick and super easy!
        </h1>

        <p className='text-[17px] text-black-100 font-light mt-5'>
          Streamline your car rental experience with our effortless booking
          process.
        </p>
      </div>
      <div className='xl:flex-[1.5] flex justify-end items-end w-full xl:h-[70vh]'>
        <div className='relative xl:w-full w-[90%] xl:h-full sm:h-[590px] h-[300px] z-0'>
          <Image
            src='/images/hero.png'
            alt='hero'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
