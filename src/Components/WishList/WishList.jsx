import React, { useContext, useEffect } from 'react'
import { WishlistContext } from '../Context/WishlistContext'
import { CartContext } from '../Context/CartContext'
import Spinner from '../Spinner/Spinner'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const { wishlist, loading, removeFromWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
  document.title = 'WishList';
}, [])


  const toastOptions = {
    duration: 1000,
    position: 'down-right',
    style: {
      background: '#101010',
      color: '#fff',
    },
  }

  const handleAddToCart = async (productId) => {
    try {
      const res = await addToCart(productId)
      if (res?.data?.status === 'success') {
        toast.success('Added to cart', toastOptions)
      }
    } catch (err) {
      toast.error('Failed to add to cart', toastOptions)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Wish List</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        wishlist.map(product => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4"
          >
            <div className="w-full md:w-1/6">
              <img src={product.imageCover} alt={product.title} className="w-full rounded" />
            </div>
            <div className="flex-1 md:px-6 w-full">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-green-600 font-medium">{product.price} EGP</p>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="text-red-500 mt-2 hover:underline cursor-pointer transition duration-300"
              >
                <i className="fa fa-trash mr-1"></i> Remove
              </button>
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
