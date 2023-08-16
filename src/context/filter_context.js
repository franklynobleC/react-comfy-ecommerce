import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../actions'
import { useProductsContext } from './products_context'

//pass the productsContext into  the filter, and  dispatch the action
// in  the index.js file,wrap the filter context withing  the products
const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest'
}

//create filter context
const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  //pass dispatch  insideEffect
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  //useEffect to control sort
  useEffect(() => {
  dispatch({type:SORT_PRODUCTS})

  }, [products, state.sort])

  //show products  in  grid layout,
  //dispatch  the action  to  the reducer

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  //show products  in  List layout,
  //dispatch  the action  to  the reducer

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = e => {
    //for demonstration
    // const name = e.target.name
    //get the value and  pass  in As payload
    const value = e.target.value
    // console.log(value)

    dispatch({ type: UPDATE_SORT, payload: value })
  }

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
