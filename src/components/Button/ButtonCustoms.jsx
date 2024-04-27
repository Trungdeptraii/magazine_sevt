import React, { memo, useRef, useState } from 'react'
import { ButtonBg, ButtonContainer, Circle, InputCustoms, TextLeft, TextRight } from './button'

const ButtonCustoms = ({checked = false, disabled = false, checkedValue = "Bật", unCheckedValue="Tắt", style={}}) => {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <InputCustoms type='checkbox' checked={checked} disabled={disabled} hidden onChange={()=>{}}/>
      <ButtonContainer style={{...style}}>
          <ButtonBg></ButtonBg>
          <Circle />
          {
            checked ? <TextLeft>{checkedValue}</TextLeft> : <TextRight>{unCheckedValue}</TextRight>
          }
      </ButtonContainer>
    </div>
  )
}

export default memo(ButtonCustoms)
