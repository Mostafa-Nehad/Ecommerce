import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
export default function Register() {

  let {setuserLogin} =useContext(UserContext);

  const [errMsg, seterrMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate()

  function submitForm(val){
          setisLoading(true);
          axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, val)
          .then(response => {
            setisLoading(false);
            console.log(response?.data?.token);
            console.log(response?.data);
            

      if(response.data.message === 'success'){
      setuserLogin(response?.data?.token);
      localStorage.setItem("usertoken", response?.data?.token);
      navigate("/");
    }


          }).catch(err => {
            setisLoading(false);
            seterrMsg(err?.response?.data?.message);
            console.log(err);
          })
        }




  let validationRegisterForm = Yup.object().shape({ 
    name:Yup.string().required("name is required").min(3,"min 3 letters").max(10,"max 10 letters"),
    email:Yup.string().required("email is required").email("invalid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{4,10}$/, "invalid password"),
    rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")], "password not match"),
    phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "invalid phone")
  })

  let formik =useFormik({
    initialValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    onSubmit:submitForm,
    validationSchema:validationRegisterForm,
    validateOnMount: true,
  })

  useEffect(() => {
      document.title = 'Register';
  }, [])
  return (
    <>
  <div className="w-full">
    <div className="">
      <h2 className="my-3  text-3xl font-bold tracking-tight text-green-500">
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name :</label>
          <div className="mt-1">
            <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name="name" id="name" type="username" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {/* alert Name */}
          {formik.touched.name && formik.errors.name?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {formik.touched.name && formik.errors.name}</span>
          </div>:null}
          {/* alert Name */}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
          <div className="mt-1">
            <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" id="email" type="email-address" autoComplete="email-address" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {/* alert email */}
          {formik.touched.email && formik.errors.email?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center ">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {formik.touched.email && formik.errors.email}</span>
          </div>:null}
          {/* alert email */}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password :</label>
          <div className="mt-1">
            <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" id="password" type="password" autoComplete="password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {/* alert password */}
          {formik.touched.password && formik.errors.password?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center ">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {formik.touched.password && formik.errors.password}</span>
          </div>:null}
          {/* alert password */}
        </div>
        <div>
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Re-password :</label>
          <div className="mt-1">
            <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name="rePassword" id="rePassword" type="password" autoComplete="confirm-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {/* alert rePassword */}
          {formik.touched.rePassword && formik.errors.rePassword?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {formik.touched.rePassword && formik.errors.rePassword}</span>
          </div>:null}
          {/* alert rePassword */}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone :</label>
          <div className="mt-1">
            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name="phone" id="phone" type="tel" autoComplete="confirm-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {/* alert phone */}
          {formik.touched.phone && formik.errors.phone?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {formik.touched.phone && formik.errors.phone}</span>
          </div>:null}
          {/* alert phone */}
        </div>
        <div className='w-fit ml-auto'>
        <button 
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || isLoading}
          className={`flex w-full justify-center rounded-md border border-transparent py-4 px-10 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 
            ${!(formik.isValid && formik.dirty) || isLoading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 translate-all duration-300'}
          `}
        >
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register Now"}
        </button>
        </div>
          {/* alert Error */}
          {errMsg?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {errMsg}</span>
          </div>:null}
          {/* alert Error */}
      </form>
    </div>
  </div>

</>
  )
}
