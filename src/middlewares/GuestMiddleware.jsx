import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const GuestMiddleware = () => {
    let isLogin = true;
  return (
    <div>{isLogin ? <Navigate to={'/'} /> : <Outlet />}</div>
  )
}

export default GuestMiddleware