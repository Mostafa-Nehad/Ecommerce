import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import img1 from '../../assets/images/slider-image-2.jpeg'
import img2 from '../../assets/images/slider-image-1.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/grocery-banner.png'
import img5 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from "react-slick";
export default function MainSlider() {

  const [counter, setcounter] = useState(0)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    dots: true,
  }

  useEffect(() => {

  }, [])
  return (
    <div className='flex flex-wrap my-5'>
      <div className="sm:w-3/4 w-full">
          <Slider {...settings}>
            <img className='h-[200px] object-fit sm:h-[400px]' src={img3} alt="" />
            <img className='h-[200px] object-fit sm:h-[400px]' src={img4} alt="" />
            <img className='h-[200px] object-fit sm:h-[400px]' src={img5} alt="" />
          </Slider>
      </div>
      <div className="sm:w-1/4 w-full">
      <img className='h-[200px] w-full  mt-8 sm:mt-0' src={img1} alt="" />
      <img className='h-[200px] w-full mt-8 sm:mt-0' src={img2} alt="" />
      </div>
    </div>
  )
}
