import { Steps } from 'antd'
import React from 'react'

const StepRun = ({data}) => {
    let items = data.length ? data.map((item)=>{
        return {title: item, description: "Đang chờ"}
    }) : []
  return (
    <Steps 
        current={0} 
        items={items} 
        style={{marginTop: 30}}
        className='stepsPoint'
    />
  )
}

export default StepRun
