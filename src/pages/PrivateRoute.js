import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later
// import { useUserContext } from '../context/user_context'

//Restrict Access to this  URL

//rest  operator, different from spread  operator,
//would gather data from  path ('exact path='""')
const PrivateRoute = ({ children}) => {
  const { user } = useAuth0()
  // eslint-disable-next-line
  // line  below,  spread  operator  is  used, (..rest)


if (!user) {
  return <Navigate to='/' />

  }
  return children;

}
export default PrivateRoute
