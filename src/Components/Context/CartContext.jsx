import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider({ children  }) {

  const [cardId, setcardId] = useState(null)
  const [totalPrice, settotalPrice] = useState(0)
  const [products, setproducts] = useState(null)
  const [numOfCartItems, setnumOfCartItems] = useState(0)

const token = localStorage.getItem("usertoken");
const headers={token: localStorage.getItem("usertoken")};

  function addToCart(prodId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {productId: prodId},
      {headers: headers}).then(res => {
        getUserCartItem();
        return res;
    }
    ).catch(err => {
      return err;
    })
  } 

  function resetCart(){
    setcardId(null);
    setnumOfCartItems(0);
    setproducts(null);
    settotalPrice(0);
  }

  function getUserCartItem(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {headers: headers},
    ).then(res => {
        setnumOfCartItems(res?.data?.numOfCartItems);
        setcardId(res?.data?.cartId);
        setproducts(res?.data?.data?.products);
        settotalPrice(res?.data?.data?.totalCartPrice);
      console.log(res);
      
    }).catch(err => {
      console.log(err);
    })
  }

  function updateItemQty(productId, newCount) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count: newCount },
    { headers }
  );
}

function removeItemFromCart(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    headers,
  });
}

function clearCart() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers,
  });
}


  useEffect(() => {
    if(token){
    getUserCartItem();
    }
  }, [token])


  return <CartContext.Provider value={{addToCart ,resetCart , numOfCartItems , cardId , products , totalPrice, getUserCartItem ,updateItemQty,
    removeItemFromCart,clearCart}}>
    {children }
    </CartContext.Provider>;
}