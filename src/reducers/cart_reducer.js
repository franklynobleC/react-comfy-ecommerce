import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find(i => i.id === id + color)
    //check if  the  item is  in  the Cart, if  yes
    if (tempItem) {
      //check if  the  item is  in the Cart,  iterate and check  where the Item is
      const tempCart = state.cart.map(cartItem => {
        //if the  cartItem  is  equal  id  + color, we  know  that  it's  the current  item, and  just Increase  the Amount
        //else  just  return  the cartItem
        if (cartItem.id === id + color) {
          //the current amount plus the amount   passed  in
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }

      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  //remove single  item  from  cart
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(item => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }

  //clear  the Entire Cart list
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  //toggle functionality

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map(cartItem => {
      if (cartItem.id === id) {
        if (value === 'inc') {
          let newAmount = cartItem.amount + 1

          //check  to  be  sure  the amount  is  not  more than all that's  in stock(item.Max)
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = cartItem.amount - 1

          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...cartItem, amount: newAmount }
        }
      } else {
        return cartItem
      }
    })

    return { ...state, cart: tempCart }
  }

  if (action.type === COUNT_CART_TOTALS) {
    //in each  iteration,  we have the cartItem
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem

        total.total_items += amount

        //amount  of  item(amount)   multiply  by  the  price
        total.total_amount += price * amount
        return total


      },
      { total_items: 0, total_amount: 0 }
    )
    return { ...state, total_items, total_amount }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
