import React from 'react'
import { OverLayLoadding, PhotoLoadding } from './loaddings'
import { gifEsa } from '../../assets/js/avaribale'

const Loadding = ({loadding}) => {
  return (
   <OverLayLoadding>
    <PhotoLoadding>
        <img alt="loadding"  style={{height: 200, width: 200}} srcSet={gifEsa}/>
    </PhotoLoadding>
   </OverLayLoadding>
  )
}

export default Loadding
