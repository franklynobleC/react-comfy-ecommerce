import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later
// import { useUserContext } from '../context/user_context'

//Restrict Access to this  URL

//rest  operator, different from spread  operator,
//would gather data from  path ('exact path='""')
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0()
  // eslint-disable-next-line
  // line  below,  spread  operator  is  used, (..rest)

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to='/'></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
