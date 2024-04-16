import React, { memo, useRef, useState } from 'react'
import { ButtonBg, ButtonContainer, Circle, InputCustoms, TextLeft, TextRight } from './button'

const ButtonClick = ({checked = false, onClick, disabled = false, checkedValue = "Bật", unCheckedValue="Tắt", idIO= "", valueIO= ""}) => {
  return (
    <div onClick={(e)=>onClick(idIO, valueIO, e)} style={{display: "flex", justifyContent: "center"}}>
      <InputCustoms type='checkbox' checked={checked} hidden disabled={disabled} onChange={()=>{}}/>
      <ButtonContainer>
        <ButtonBg></ButtonBg>
        <Circle />
        {
            checked ? <TextLeft>{checkedValue}</TextLeft> : <TextRight>{unCheckedValue}</TextRight>
        }
      </ButtonContainer>
    </div>
  )
}

export default memo(ButtonClick)
