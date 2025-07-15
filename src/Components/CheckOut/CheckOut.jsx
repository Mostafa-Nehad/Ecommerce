import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import Spinner from '../Spinner/Spinner'

export default function Checkout() {
  const navigate = useNavigate()
  const { cardId, resetCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [isOnline, setisOnline] = useState(true)

  const validationSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    phone: Yup.string()
      .required('phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'invalid phone'),
    city: Yup.string().required('City is required'),
  })

  function PayCash(val){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
      {shippingAddress: val},{headers:{token: localStorage.getItem('usertoken')}}).
      then(res=>{
        console.log(res);
        if(res?.data?.status === 'success'){
      toast.success('Order created successfully', {
        duration: 1500,
        position: 'top-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
        resetCart();
        setTimeout(() => {
          navigate('/allorders');
        }, 1500);
      }
      }).
      catch(err=>{
        toast.error('Order failed', {
        duration: 1500,
        position: 'top-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
        console.log(err)
      }
    )
  }

  function PayOnline(val){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=https://ecommerce-gamma-ten-19.vercel.app/`,
        {shippingAddress: val},
        {headers:
          {token: localStorage.getItem('usertoken')}}).
        then(res=>{
          console.log(res);
          if(res?.data?.status === 'success'){
              console.log(res?.data?.session?.url);
              window.location.href = res?.data?.session?.url;
          }
        }).catch(err=>{
          console.log(err)
        })
  }

    function detectPayment(val){
      if(isOnline){
        PayOnline(val);
      }else{
        PayCash(val);
      }
    }

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: detectPayment,
    validateOnMount: true,
  })

  useEffect(() => {
  document.title = 'Checkout';
}, [])

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {loading && <Spinner />}

      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* DETAILS */}
        <div>
          <label htmlFor="details" className="block font-medium">Details</label>
          <input
            id="details"
            name="details"
            type="text"
            className="form-control w-full border rounded p-2"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md text-lg flex items-center">
              <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207A11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z" />
              </svg>
              <span className="text-red-800">{formik.errors.details}</span>
            </div>
          ) : null}
        </div>

        {/* PHONE */}
        <div>
          <label htmlFor="phone" className="block font-medium">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-control w-full border rounded p-2"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md text-lg flex items-center">
              <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207A11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z" />
              </svg>
              <span className="text-red-800">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>

        {/* CITY */}
        <div>
          <label htmlFor="city" className="block font-medium">City</label>
          <input
            id="city"
            name="city"
            type="text"
            className="form-control w-full border rounded p-2"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md text-lg flex items-center">
              <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207A11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z" />
              </svg>
              <span className="text-red-800">{formik.errors.city}</span>
            </div>
          ) : null}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={() => setisOnline(false)}
          type="submit"
          disabled={!formik.isValid || loading}
          className={`w-full py-2 text-white font-semibold rounded transition ${
            !formik.isValid || loading
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Pay Cash
        </button>
        <button
          onClick={() => setisOnline(true)}
          type="submit"
          disabled={!formik.isValid || loading}
          className={`w-full py-2 text-white font-semibold rounded transition ${
            !formik.isValid || loading
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Pay Online
        </button>
      </form>
    </div>
  )
}
