import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../actions'

// All the  action Dispatch from  the filter Context
const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map(p => p.price)
    maxPrice = Math.max(...maxPrice)

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = [...filtered_products]
    //sort items  using  javascript array sort
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      // console.log(state)
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }

    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  if (action.type === UPDATE_FILTERS) {
    //destructure and  from payload, name and value
    const { name, value } = action.payload
    //here passing  the value dynamically,  set the name  to  the value in  thefilters Object
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === FILTER_PRODUCTS) {
    //create new set of data and pass  it to  the array we are getting back
    const { all_products } = state // destructure from  the state
    console.log('from  filters', state.filters)
    const { text, category, company, color, price, shipping } = state.filters

    let tempProducts = [...all_products]
    //filtering
    //filter text, (products name  in category)
    if (text) {
      tempProducts = tempProducts.filter(product => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    //category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.category === category
      })
    }

    //company

    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.company === company
      })
    }

    //filters  for colors, color has array of  arrays
    if (color !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.colors.find(c => c === color)
      })
    }

    //price  filter, less  or equal to  the current  price, using  implicit return
    tempProducts = tempProducts.filter(product => product.price <= price)

    //shipping,if  the condition is  met, return  it
    if (shipping) {
      tempProducts = tempProducts.filter(product => {
        return product.shipping === true
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',

        max_price: state.filters.max_price,

        shipping: false
      }
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
