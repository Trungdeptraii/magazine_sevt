import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthMiddleware = () => {
    let isLogin = false
  return (
    <div>{isLogin ? <Outlet /> : <Navigate to={'/login'}/>}</div>
  )
}

export default AuthMiddleware