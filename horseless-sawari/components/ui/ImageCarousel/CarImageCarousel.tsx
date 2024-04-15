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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageUrls: string[] = [];
  itemData?.forEach((item) => {
    item.car_images.forEach((image) => {
      imageUrls.push(image);
    });
  });

  return (
    <div>
      <div>
        <Slider {...settings}>
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img
                srcSet={imageUrl}
                src={imageUrl}
                alt='Car Image'
                className='w-[95%] max-h-[450px] rounded-lg'
                style={{ objectFit: 'fill' }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarImageCarousel;
