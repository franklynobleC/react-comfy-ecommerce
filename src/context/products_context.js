import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  product_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_error: false,
  single_product_loading: false,
  single_product: {}
}

//   declare global context  and  make it Available Globally
//also  here  Set All  the action and  using Dispatch
const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  //pass  in   reducerfunction, and initial state object
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  //fetch data from API  using Axios
  const fetchProducts = async url => {
    try {
      dispatch({ type: GET_PRODUCTS_BEGIN })

      const response = await axios.get(url)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
      console.log(response)
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async url => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })

    try {
      const response = await axios.get(url)

      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(url)
    openSidebar()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,

        openSidebar,
        closeSidebar
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// to  make  the Product context Available Globally, export  from  here, make  it Available here
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
