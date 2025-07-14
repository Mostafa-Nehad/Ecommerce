import React, { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    totalPrice,
    numOfCartItems,
    products,
    cardId,
    getUserCartItem,
    updateItemQty,
    removeItemFromCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cardId) {
      navigate(`/Checkout/${cardId}`);
    }
  };

  useEffect(() => {
  document.title = 'Cart';
}, [])

  return (
    <div className="container mx-auto bg-gray-100 p-6 my-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cart Shop</h2>
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white py-2 px-5 rounded text-lg hover:bg-green-700 transition"
        >
          Check Out
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-medium">
          Total Price: <span className="text-green-600">{totalPrice} EGP</span>
        </h5>
        <h5 className="text-lg font-medium">
          Total Number of Items:{" "}
          <span className="text-green-600">{numOfCartItems}</span>
        </h5>
      </div>

      {products?.map((item) => (
        <div
          key={item.product.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4 w-full">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-24 rounded"
            />
            <div className="flex flex-col justify-between">
              <h5 className="text-md font-semibold">{item.product.title}</h5>
              <h6 className="text-sm text-gray-700">{item.price} EGP</h6>
              <button
                onClick={async () => {
                  await removeItemFromCart(item.product._id);
                  getUserCartItem();
                }}
                className="text-red-600 text-sm hover:underline transition duration-300 cursor-pointer mt-5 w-fit"
              >
                <i className="fa fa-trash mr-1"></i>Remove
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await updateItemQty(item.product._id, item.count + 1);
                getUserCartItem();
              }}
              className="bg-transparent border border-green-500 text-xl px-3 py-1 cursor-pointer rounded"
            >
              +
            </button>

            <span>{item.count}</span>

            <button
              onClick={async () => {
                if (item.count > 1) {
                  await updateItemQty(item.product._id, item.count - 1);
                  getUserCartItem();
                }
              }}
              className="bg-transparent border border-green-500 text-xl px-3.5 py-1 cursor-pointer rounded"
            >
              -
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={async () => {
          await clearCart();
          getUserCartItem();
        }}
        className="mt-6 block mx-auto bg-red-600 text-white py-2 px-5 rounded hover:bg-red-700 transition"
      >
        Clear Your Cart
      </button>
    </div>
  );
}
