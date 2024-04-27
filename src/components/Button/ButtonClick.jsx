import React, { memo, useRef, useState } from 'react'
import { ButtonBg, ButtonContainer, Circle, InputCustoms, TextLeft, TextRight } from './button'

const ButtonClick = ({checked = false, onClick, disabled = false, checkedValue = "Bật", unCheckedValue="Tắt", idIO= "", valueIO= "", style={}, space=0}) => {
  return (
    <label htmlFor='btnButton'  style={{display: "flex", justifyContent: "center"}}>
      <InputCustoms type='checkbox' id='btnButton' checked={checked} hidden disabled={disabled} onChange={()=>{}} onClick={(e)=>onClick(idIO, valueIO, e)}/>
      <ButtonContainer style={{...style}}>
        <ButtonBg></ButtonBg>
        <Circle />
        {
            checked ? <TextLeft style={{left: space}}>{checkedValue}</TextLeft> : <TextRight style={{right: space}}>{unCheckedValue}</TextRight>
        }
      </ButtonContainer>
    </label>
  )
}

export default memo(ButtonClick)
