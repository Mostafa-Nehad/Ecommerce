import React, { useEffect, useState } from 'react'
import style from './Notfound.module.css'
import { Link } from 'react-router-dom'
export default function Notfound() {

  const [counter, setcounter] = useState(0)

  useEffect(() => {
  document.title = 'Error 404';
  }, [])
  return (
    <>
<section className="flex items-center h-screen p-16 bg-gray-50 ">
  <div className="container flex flex-col items-center ">
    <div className="flex flex-col gap-6 max-w-md text-center">
      <h2 className="font-extrabold text-9xl text-gray-600">
        <span className="sr-only">Error</span>404
      </h2>
      <p className="text-2xl md:text-3xl">Sorry, we couldn't find this page.</p>
      <Link to={'/'} className="px-8 py-4 text-xl font-semibold rounded bg-green-600 text-white hover:bg-green-500 translate-all duration-300">Back to home</Link>
    </div>
  </div>
</section>

    </>
  )
}
