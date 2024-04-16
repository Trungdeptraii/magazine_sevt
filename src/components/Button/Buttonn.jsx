import React, { memo } from 'react'
import { ButtonPrimary } from './button';

const Buttonn = ({children, onClick, style={}}) => {
  return (
    <ButtonPrimary style={{...style}} onClick={onClick}>{children}</ButtonPrimary>
  )
}

export default Buttonn
