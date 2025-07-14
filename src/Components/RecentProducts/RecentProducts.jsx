import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../Context/WishlistContext'

export default function RecentProducts() {
  const [allProducts, setAllProducts] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const { addToCart } = useContext(CartContext)
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext)

  const filteredProducts = allProducts?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setAllProducts(res?.data?.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function addProdToCart(prodId) {
    let res = await addToCart(prodId)
    if (res?.data?.status === 'success') {
      toast.success(res?.data?.message, {
        duration: 1000,
        position: 'down-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    } else {
      toast.error('Error adding product to cart', {
        duration: 1000,
        position: 'down-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    }
  }

  function isInWishlist(productId) {
    return wishlist?.some((item) => item._id === productId)
  }

  async function handleToggleWishlist(productId) {
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId)
        toast('Removed from wishlist', {
          duration: 1000,
          position: 'down-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        })
      } else {
        const res = await addToWishlist(productId)
        toast.success(res?.data?.message || 'Added to wishlist', {
          duration: 1000,
          position: 'down-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        })
      }
    } catch (error) {
      toast.error('Something went wrong', {
        duration: 1000,
        position: 'down-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="my-6 w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {allProducts?.length > 0 ? (
        <div className="flex gap-y-4 flex-wrap">
          {filteredProducts?.map((product) => (
            <div
              key={product.id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 rounded group transition duration-300 hover:shadow-[1px_1px_10px_#4fa74f]"
            >
              <div className="product px-2 py-4 h-full flex flex-col justify-between">
                <Link
                  to={`/Productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full rounded mb-3"
                  />
                  <p className="text-sm text-gray-600">
                    {product.category.name}
                  </p>
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
                    onClick={() => addProdToCart(product._id)}
                    className="bg-green-600 text-white py-1 px-3 rounded w-3/4 hover:bg-green-700 cursor-pointer relative top-12 
                    group-hover:top-0 transition-all duration-500"
                  >
                    Add To Cart
                  </button>

                  <i
                    className={`fa-heart text-xl cursor-pointer ${
                      isInWishlist(product._id)
                        ? 'fa-solid text-red-500'
                        : 'fa-regular text-gray-400'
                    }`}
                    onClick={() => handleToggleWishlist(product._id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}
