import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import './ImageCarousel.css';

interface ImageCarouselProps {
  itemData: any;
}

const LocationImageCarousel: React.FC<ImageCarouselProps> = ({ itemData }) => {
  const router = useRouter();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div>
        <Slider {...settings}>
          {itemData?.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                router.push(`/vehicles?location_id=${item.location_id}`)
              }
            >
              <img
                style={{
                  width: '90%',
                  objectFit: 'cover',
                }}
                srcSet={`${item.location_image}`}
                src={`${item.location_image}`}
                alt={item.location_name}
                loading='lazy'
              />
              <div className='mt-4 text-lg font-bold'>{item.location_name}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LocationImageCarousel;
