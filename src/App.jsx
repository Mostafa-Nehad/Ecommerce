import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Notfound from './Components/Notfound/Notfound'
import CounterContextProvider from './Components/Context/CounterContext';
import UserContextProvider from './Components/Context/UserContext'
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'
import Productdetails from './Components/Productdetails/Productdetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import CartContextProvider from './Components/Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList'
import WishlistContextProvider from './Components/Context/WishlistContext'
import Checkout from './Components/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'


let queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  let router = createBrowserRouter([

    {path: "", element: <Layout/>, children:[
    {index: true , element: <ProtectRoute><Home/></ProtectRoute>},
    {path: "products" , element: <ProtectRoute><Products/></ProtectRoute>},
    {path: "brands" , element: <ProtectRoute><Brands/></ProtectRoute>},
    {path: "categories" , element: <ProtectRoute><Categories/></ProtectRoute>},
    {path: "wishList" , element: <ProtectRoute><WishList/></ProtectRoute>},
    {path: "cart" , element: <ProtectRoute><Cart/></ProtectRoute>},
    {path: "allorders" , element: <ProtectRoute><AllOrders/></ProtectRoute>},
    {path:"/Checkout/:cartId" , element: <ProtectRoute><Checkout/></ProtectRoute>},
    {path: `Productdetails/:id/:category` , element: <ProtectRoute><Productdetails/></ProtectRoute>},
    {path: "register" , element: <Register/>},
    {path: "login" , element: <Login/>},
    {path: "ForgetPassword" , element: <ForgetPassword/>},
    {path: "VerifyResetCode" , element: <VerifyResetCode/>},
    {path: "ResetPassword" , element: <ResetPassword/>},
    {path: "*" , element: <Notfound/>}
    ]}

  ])



  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <WishlistContextProvider>
                <RouterProvider router={router} />
                <Toaster />
              </WishlistContextProvider>
            </CounterContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
