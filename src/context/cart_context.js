import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS
} from '../actions'

//check  if item is  in  local storage

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')

  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //add to cart function
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }
  //remove Item
  const removeItem = id => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  // toggle  amount

  const toggleAmount = (id, value) => {
    console.log(id, value)
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  //clear cart

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  //use effect, whenever item is  changed  in  my Cart, invoke  the useEffect
  //anytime something changes, override the value  in the  localstorage
  useEffect(() => {
    //dispatch  this when  the component mounts
    dispatch({ type: COUNT_CART_TOTALS })

    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeItem, toggleAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
