import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'))
//Wrap the Whole App using  the Products Provider....
//in the  app , we Have the Whole components
//dev - xacylw1gno1sqc61.us.auth0.com

//UXwDo4BoY2Qhq7HeaVHDedtmMzYKFLEM

root.render(
  <Auth0Provider
    domain='dev-xacylw1gno1sqc61.us.auth0.com'
    clientId='UXwDo4BoY2Qhq7HeaVHDedtmMzYKFLEM'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation='localstorage'
  >
   <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
)
