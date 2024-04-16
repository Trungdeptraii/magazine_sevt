import React, { useState } from 'react'
import { SettingItemContainer, SettingItemContainerHeader, SettingItemTitle, columnsJig, columnsMagazine } from './setting_'
import { Button, Table } from 'antd'
import Buttonn from '../../components/Button/Buttonn'
import {DivConveyor, FormIO, InputIO, SpanConveyor} from "./setting_"
import {toast} from "react-toastify"
import Drawerr from '../IO/Drawerr'
import { FetchAPI } from '../../utils/api'
import { hostJS, pathPointJS, portJS } from '../../assets/js/avaribale'
import {_} from "lodash"

const SettingJigItem = ({data=[], fnChoose, children, type="", onChoose, namePoint}) => {
  let [showDrawer, setShowDrawer] = useState(false)
  let [dataPoint, setDataPoint] = useState([])
  let columns
  if(type.includes("jig")){
    columns = columnsJig
  }else if(type.includes("magazine")){
    columns = columnsMagazine
  }
  const handleGetPoint = async()=>{
    let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: pathPointJS})
    if(type == "succees"){
      setDataPoint(data)
      setShowDrawer(true)
    }else if(type == "fail"){
      toast.warning("Gửi lệnh thất bại...")
    }else if(type == "error"){
      toast.error("Không có phản hồi từ server...")
    }
  }
  const handleAddPointMove = (item)=>{
    onChoose(item, type, "point")
  }
  return (
    <SettingItemContainer>
      <Drawerr open={showDrawer} setOpen={setShowDrawer} arrPoint={dataPoint} onChoose={handleAddPointMove}/>
      <SettingItemContainerHeader>
        <SettingItemTitle>{children}</SettingItemTitle>
        <Button onClick={()=>{fnChoose(type)}} style={{width: 130}}>Thay đổi model</Button>
      </SettingItemContainerHeader>
      <DivConveyor style={{justifyContent: "normal", gap: 0, height: 50}}>
        <label htmlFor="pointIo" style={{width: "100%"}}>
          <div style={{display: "flex"}}>
            <SpanConveyor style={{backgroundColor: "transparent"}}>Điểm làm việc: </SpanConveyor>
            <FormIO>
              <InputIO required id='pointIo' name={type} value={namePoint ? namePoint : ""} placeholder='Chưa có điểm làm việc' disabled={true}/>
              <Button style={{width: 130}} onClick={handleGetPoint}>Thay đổi điểm</Button>
            </FormIO>
          </div>
        </label>
      </DivConveyor>
      <Table columns={columns} dataSource={data} pagination={false}/>
    </SettingItemContainer>
  )
}

export default SettingJigItem
