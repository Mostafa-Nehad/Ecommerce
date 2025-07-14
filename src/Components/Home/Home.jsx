import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import Brands from '../Brands/Brands'
import { counterContext } from '../Context/CounterContext'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {

  let {counter,setcounter,user} = useContext(counterContext);
  
  const [counterr, setcounterr] = useState(0)

  useEffect(() => {
      document.title = 'Home';
  }, [])
  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
  </>
}
