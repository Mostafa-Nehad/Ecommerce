import React, { useContext } from 'react'
import style from './Productdetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishlistContext'
import toast from 'react-hot-toast'

export default function Productdetails() {
  const { id, category } = useParams()

  const { addToCart } = useContext(CartContext)
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

  const isInWishlist = (productId) => wishlist?.some((item) => item._id === productId)

  // Global toast options
  const toastOptions = {
    duration: 1000,
    position: 'down-right',
    style: {
      background: '#101010',
      color: '#fff',
    },
  }

  const handleToggleWishlist = async (productId) => {
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId)
        toast('Removed from wishlist', toastOptions)
      } else {
        await addToWishlist(productId)
        toast.success('Added to wishlist', toastOptions)
      }
    } catch (err) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  const handleAddToCart = async (productId) => {
    try {
      const res = await addToCart(productId)
      if (res?.data?.status === 'success') {
        toast.success(res.data.message, toastOptions)
      }
    } catch (err) {
      toast.error('Failed to add to cart', toastOptions)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  }

  const {
    data: Productdetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['details', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data?.data?.data,
  })

  const { data: relatedProducts } = useQuery({
    queryKey: ['related', category],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products`),
    select: (res) =>
      res?.data?.data?.filter((product) => product.category.name === category),
  })

  if (isLoading) return <Spinner />
  if (isError) return <h1>Error.......</h1>

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 my-8">
        <div className="w-full overflow-hidden h-[550px] md:w-1/3 ">
          <Slider {...settings}>
            {Productdetails?.images?.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={Productdetails?.title}
                className="w-full rounded object-cover"
              />
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {Productdetails?.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {Productdetails?.description}
          </p>
          <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded text-sm">
            {Productdetails?.category?.name}
          </span>

          <div className="flex justify-between items-center text-lg font-semibold mt-4">
            <span className="text-gray-800 pl-2">
              {Productdetails?.price} EGP
            </span>
            <span className="text-yellow-500 flex items-center gap-1">
              <i className="fas fa-star"></i> {Productdetails?.ratingsAverage}
            </span>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => handleAddToCart(Productdetails._id)}
              className="w-3/4 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all duration-300 md:mx-auto"
            >
              + Add to Cart
            </button>
            <i
              className={`fa-heart text-2xl cursor-pointer transition-all duration-300 ${
                isInWishlist(Productdetails._id)
                  ? 'fa-solid text-red-500'
                  : 'fa-regular text-gray-500 hover:text-red-500'
              }`}
              onClick={() => handleToggleWishlist(Productdetails._id)}
            ></i>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-3xl text-green-500 font-semibold mb-6">
          Related Products
        </h3>

        <div className="flex flex-wrap gap-y-4">
          {relatedProducts?.map((product) => (
            <div
              key={product._id}
              className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 rounded group transition duration-300 hover:shadow-[1px_1px_10px_#4fa74f]"
            >
              <div className="product px-2 py-4 h-full flex flex-col justify-between">
                <Link
                  to={`/Productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full rounded mb-3"
                    alt={product.title}
                  />
                  <span className="text-sm text-gray-600">
                    {product.category.name}
                  </span>
                  <h3 className="text-base font-semibold mt-1">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-600 font-medium">
                      {product.price} EGP
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <i className="fa fa-star"></i>
                      <span className="text-sm text-gray-800">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between mt-4 overflow-hidden">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-green-600 text-white py-1 px-3 rounded w-3/4 hover:bg-green-700 cursor-pointer relative top-12 
                    group-hover:top-0 transition-all duration-500"
                  >
                    + Add
                  </button>
                  <i
                    className={`fa-heart text-xl cursor-pointer ${
                      isInWishlist(product._id)
                        ? 'fa-solid text-red-500'
                        : 'fa-regular text-gray-400 hover:text-red-500'
                    }`}
                    onClick={() => handleToggleWishlist(product._id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
