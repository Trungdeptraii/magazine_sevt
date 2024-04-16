import React, { memo, useEffect, useState } from 'react'
import { Button, DatePicker, Space, Table, Select } from 'antd'
import { columns, data, logCheckSelect, logSelected } from './log_'
import { FetchAPI } from '../../utils/api.js';
import { hostJS, pathLogJS, portJS } from '../../assets/js/avaribale.js';
import { showTime } from '../../utils/clientUtil.js';
import dayjs from 'dayjs';
import Loadding from '../Loadding/Loadding.jsx';
import { TitleField } from '../../assets/js/globalStyle.js';

const Log = ({pageSize=11, event=0}) => {
  let [data, setData] = useState("");
  let [select, setSelect] = useState("")
  let [loadding, setLoadding] = useState(false)
  let [dateFind, setDateFind] = useState(showTime({type: "date", data: Date.now()}));
  const getLog = async ({search=""})=>{
    setLoadding(true)
    let path
    if(!search){
      path = pathLogJS
    }else if(search){
      path = `${pathLogJS}?date=${search}${select}`
    }
    let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path})
    setData(data.map((item)=>{
      return({...item, time: showTime({data: +item.timestamp})})
    }).reverse())
    setLoadding(false)
  }
  const handleChangeDate = (date, dateString)=>{
    if(dateString){
      setDateFind(dateString)
    }
  }
  const handleClickFind = ()=>{
    getLog({search: showTime({type: "date", data: dateFind})})
  }
  const handleChangeSelect = (value)=>{
    if(logCheckSelect.includes(value)){
      setSelect(`&type=${value}`)
      return
    }
    setSelect("")
  }
  useEffect(()=>{
    getLog({search: showTime({type: "date"})})
  },[event])
  return (
    <div style={{height: "100%"}}>
      {
        pageSize == 11 ? <TitleField>Sự kiện</TitleField> : ""
      }
      <Space>
        <DatePicker onChange={handleChangeDate} defaultValue={dayjs(showTime({type: "date", data: Date.now()}))}/>
        <Select style={{width: 200}} onChange={handleChangeSelect} options={logSelected} defaultValue="all"/>
        <Button type="primary" size="large" onClick={handleClickFind}>Tìm kiếm</Button>
      </Space>
      <Table dataSource={data} columns={columns} pagination={{
        pageSize: pageSize,
        defaultCurrent: 1
      }}/>
      {/* {
        loadding ? <Loadding /> : ""
      } */}
    </div>
  )
}

export default memo(Log)