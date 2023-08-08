import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <Wrapper className='page-100'>
      <section></section>
      <h1>404</h1>
      <h3>Sorry, the Page you tried cannot be found</h3>
      <Link to='/' className='btn'>
        back home
      </Link>
      error page
    </Wrapper>
  )
}

//the .css file,   the error  page  takes the whole Page aside  the heading
const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage
