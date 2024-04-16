import { Steps } from 'antd'
import React from 'react'
const StepName = ({data}) => {
    let items = data.length ? data.map((item)=>{
        return {title: item}
    }) : []
  return (
    <Steps
        type="navigation"
        size="small"
        current={0}
        className="site-navigation-steps"
        items={items}
        style={{marginTop: 20}}
    />
  )
}

export default StepName
