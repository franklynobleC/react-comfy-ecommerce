import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {
  Home,
  SingleProduct,
  About,
  CheckOut,
  Error,
  PrivateRoute,
  Products,
  Cart,
  AuthWrapper
} from './pages'

// import styled from 'styled-components'
// import Testing from './Testing';
// import PrivateRoute from './pages/PrivateRoute';
// how  to  style a component for  my reference
// const Button = styled.button`
//   background: green;
//   color: white;
//   padding: 10px;
//   content: center;
// `

// const Container = styled.div`
//   background: red;
//   color: white;
//   font-size: 2rem;
//   .hero {
//     font-size: 8rem;

//     color-scheme: black;
//   }
// `
function App () {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<SingleProduct />} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
