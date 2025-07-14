import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
export default function Layout() {

  const [counter, setcounter] = useState(0)

  useEffect(() => {

  }, [])
  return (
    <>
    <Navbar/>
    <div className=" container max-w-6xl mx-auto px-4 pt-17
    mb-10">
    <Outlet/>
    </div>
    </>
  )
}
