import React, {useState} from 'react'
import { Steps} from 'antd';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

let percent
const StepAMR = ({data, current}) => {
  const [targetDist, setTargetDis] = useState(0);
  const {amr: {data: dataAMR}} = useSelector((state)=>{return state.amr}) // status Data AMR
  useEffect(()=>{
    if(!dataAMR?.target_dist){
      setTargetDis(0)
      percent = 0
    }else{
      if(!targetDist){
        setTargetDis(dataAMR.target_dist)
      }
    }
  },[dataAMR?.target_dist])
  let datas = data.length ? data.map((item)=>{
    return {
      title: item.name,
      description: `${item.status} ${item.time}`,
    }
  }) : []
  if(targetDist){
    if(current){
      percent = (((targetDist - dataAMR.target_dist)/targetDist)*100).toFixed(0)
      datas[current].description = ` khoảng cách: ${(dataAMR.target_dist).toFixed(3)} m`
    }
  }
  return (
    <Steps
      current={current}
      percent={percent}
      items={datas}
      className='stepsPoint'
      style={{marginTop: '20px'}}
    >
    </Steps>
  )
}

export default StepAMR