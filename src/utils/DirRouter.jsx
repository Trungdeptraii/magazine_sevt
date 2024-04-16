import React from 'react'
import { Navigate } from 'react-router-dom'

const DirRouter = ({path}) => {
  return (
    <Navigate to={path} />
  )
}

export default DirRouter