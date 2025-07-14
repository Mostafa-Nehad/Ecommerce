import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
export default function CategorySlider() {

  const [categories, setcategories] = useState(null);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows:false,
    autoplay: true,
    dots: false,
responsive: [
      {
        breakpoint: 1024,
        settings: {
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function getAllCategorySlider() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(res => {
        console.log(res?.data?.data);
        setcategories(res?.data?.data);
        // setcounter(res?.data?.data.length);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
      getAllCategorySlider();
  }, [])
  return (
    <div className='my-7'>
      <h2 className='text-2xl my-5 font-medium'>Shop Popular Categories</h2>
                <Slider {...settings}>
                  {categories?.map((category) => {
                    return <div>
                      <img className='h-[250px] border-none w-100 object-cover object-center ' src={category.image} alt={category.name}/>
                      <h3 className='font-bold text-2xl'>{category.name}</h3>
                    </div>
                  })}
                </Slider>
    </div>
  )
}
