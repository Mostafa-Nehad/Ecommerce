import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
export default function Products(props) {

  const [counter, setcounter] = useState(0)
  useEffect(() => {
  document.title = 'Products';
  }, [])
  return (
    <>
  <RecentProducts/>
    </> 
  )
}
