import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {
  Home,
  SingleProduct,
  About,
  CheckOut,
  Error,
  PrivateRoute,
  Products,
  Cart
} from './pages'

// import styled from 'styled-components'
// import Testing from './Testing';
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
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/checkout'>
          <CheckOut />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />}>
          <SingleProduct />

          <Route path='*'>
            <Error />
          </Route>
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
