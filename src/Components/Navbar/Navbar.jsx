import React, { useContext, useState } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { counterContext } from '../Context/CounterContext'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { counter } = useContext(counterContext)
  const { userLogin, setuserLogin } = useContext(UserContext)

  let{numOfCartItems} =useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false)

  function logout() {
    localStorage.removeItem('usertoken')
    setuserLogin(null)
    navigate('/login')
  }

  return (
    <nav className="bg-slate-300 p-2 fixed top-0 start-0 end-0 z-50 shadow">
      <div className="container px-4 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full  flex justify-between items-center">
          <img src={logo} alt="logo" className="w-[180px]" />
          <button
            className="lg:hidden text-3xl text-slate-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div
          className={`w-full lg:flex flex-col lg:flex-row ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-center w-full">
            {userLogin != null && (
              <>
                <li className="text-xl mx-2 text-slate-800 py-2">
                  <NavLink to="/" className="relative active">
                    Home
                  </NavLink>
                </li>
                <li className="text-xl mx-2 text-slate-800 py-2">
                  <NavLink to="/products" className="relative active">
                    Products
                  </NavLink>
                </li>
                <li className="text-xl mx-2 text-slate-800 py-2">
                  <NavLink to="/categories" className="relative active">
                    Categories
                  </NavLink>
                </li>
                <li className="text-xl mx-2 text-slate-800 py-2">
                  <NavLink to="/brands" className="relative active">
                    Brands
                  </NavLink>
                </li>
                <li className="text-xl mx-2 text-slate-800 py-2">
                  <NavLink to="/wishList" className="relative active">
                    wishList
                  </NavLink>
                </li>
                <li className="text-xl mx-2 text-slate-800 py-2">
                  <NavLink to="/allorders" className="relative active">
                    Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <div
            className={`w-full lg:flex flex-col lg:flex-row ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
                    <ul className="flex flex-col lg:flex-row items-center w-full lg:justify-end">
            {userLogin === null ? (
              <>
                <li className="text-xl text-slate-800 mx-3 py-2">
                  <NavLink to="/register" className="relative active">
                    Register
                  </NavLink>
                </li>
                <li className="text-xl text-slate-800 mx-3 py-2">
                  <NavLink to="/login" className="relative active">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
              <li className="relative mx-3 py-2">
  <NavLink to="/cart" className="text-slate-800 text-2xl relative">
    <i className="fa-solid fa-cart-shopping"></i>
    {numOfCartItems > 0 && (
      <span className="absolute -top-2 -end-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {numOfCartItems}
      </span>
    )}
  </NavLink>
</li>
              <li
                onClick={logout}
                className="text-xl text-slate-800 mx-3 py-2 cursor-pointer">
                <span className="relative active">Logout</span>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
