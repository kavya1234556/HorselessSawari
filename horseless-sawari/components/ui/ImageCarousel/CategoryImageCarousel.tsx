import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import './ImageCarousel.css';

interface ImageCarouselProps {
  itemData: any;
}

const CategoryImageCarousel: React.FC<ImageCarouselProps> = ({ itemData }) => {
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
          {itemData?.map((item, index) => {
            console.log('actualData', item.category_image);
          })}
          {itemData?.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                router.push(`/vehicles?category_id=${item.category_id}`)
              }
            >
              <img
                style={{
                  width: '90%',
                  objectFit: 'cover',
                }}
                srcSet={`${item.category_image}`}
                src={`${item.category_image}`}
                alt={item.category_name}
                loading='lazy'
              />
              <div className='mt-4 text-lg font-bold'>{item.category_name}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryImageCarousel;
