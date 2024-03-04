import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import './ImageCarousel.css';

interface ImageCarouselProps {
  itemData: any;
}

const CarImageCarousel: React.FC<ImageCarouselProps> = ({ itemData }) => {
  // const router = useRouter();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div>
        <Slider {...settings}>
          {itemData?.map((item, index) => (
            <div key={index}>
              {item.car_images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  srcSet={image}
                  src={image}
                  alt='Car Image'
                  className='w-[90%] max-h-[450px] rounded-lg'
                  style={{ objectFit: 'fill' }}
                />
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarImageCarousel;
