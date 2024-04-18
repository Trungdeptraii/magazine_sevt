import React, { useEffect, useState } from 'react'
import { MonitorBottomLeft, MonitorBottomRight, MonitorContainer, MonitorIcon, MonitorItem, MonitorTopLeft, MonitorTopRight, bgInitial, dataMove, handleMonitor, modeSelected, modelSelected, settingInitial } from './monitor_'
import { FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft, FaArrowUp, FaStop  } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { Space, Button, Typography, Select } from 'antd';
import FormSetting from './FormSetting';
import { TitleField } from '../../assets/js/globalStyle';

const {Text} = Typography
let type = "screen"

const Monitor = () => {
  const [bg, setBg] = useState(bgInitial)
  const [setting, setSetting] = useState(settingInitial)
  const [model, setModel] = useState(true)
  const [data, setData] = useState(dataMove)
  const [mode, setMode] = useState(true)
  const [open, setOpen] = useState(false)

  const handleMouseDown = (value)=>{
    if(!mode && bg[value]=="blue"){
      handleMonitor("stop", data)
      setBg({...bg, [value]: "grey"})
      return
    }
    handleMonitor(value, data)
    setBg({...bgInitial, [value]: "blue"})
  }
  const handleMouseUp = (value)=>{
    if(mode){
      setBg({...bg, [value]: "grey"})
      if(value != "stop"){
        handleMonitor("stop", data)
      }
    }
    if(value == "stop"){
      setBg(bgInitial)
    }
  }
  const handleClick = ()=>{
    setOpen(!open)
  }
  const handleClickRight =(e)=>{
    if(model){
      e.preventDefault()
    }
  }
  const handleChangeSelect = (model)=>{
    setModel(model)
  }
  const handleChangeSelectMode = (mode)=>{
    setMode(mode)
  }
  useEffect(()=>{
    setData({vx: setting.speed, w: +(setting.rotate * Math.PI / 180).toFixed(2)})
  }, [setting.speed, setting.rotate])
  return (
    <div onContextMenu={handleClickRight}>
      <TitleField>Điều khiển</TitleField>
      <Space>
        <Button type="primary" icon={<AiFillSetting />} size="large" style={{display: 'flex', alignItems: 'center'}} onClick={handleClick}>Cài đặt</Button>
        <Select style={{width: 120}} onChange={handleChangeSelect} options={modelSelected} defaultValue={true}/>
        <Select style={{width: 120}} onChange={handleChangeSelectMode} options={modeSelected} defaultValue={true}/>
        <Text style={{fontSize: 18}} strong>Tốc độ chạy: {setting.speed} m/s</Text>
        <Text style={{fontSize: 18}} strong>Tốc độ xoay: {setting.rotate} m/s</Text>
      </Space>
      {
        open ? <FormSetting editPoint={setting} setOpen={setOpen} setSetting={setSetting}/> : ""
      }
      <MonitorContainer>
        <MonitorItem >
          <MonitorTopLeft onMouseDown={()=>{if(!model){handleMouseDown("bottomRight")}}} onMouseUp={()=>{if(!model){handleMouseUp("bottomRight")}}} onTouchStart={()=>{if(model){handleMouseDown("bottomRight")}}} onTouchEnd={()=>{if(model){handleMouseUp("bottomRight")}}}  >
            <FaArrowUp style={{color: bg.bottomRight}}/>
          </MonitorTopLeft>
        </MonitorItem>
        <MonitorItem>
          <MonitorIcon onMouseDown={()=>{if(!model){handleMouseDown("bottom")}}} onMouseUp={()=>{if(!model){handleMouseUp("bottom")}}} onTouchStart={()=>{if(model){handleMouseDown("bottom")}}} onTouchEnd={()=>{if(model){handleMouseUp("bottom")}}}>
            <FaChevronUp style={{color: bg.bottom}}/>
          </MonitorIcon>
        </MonitorItem>
        <MonitorItem>
          <MonitorTopRight onMouseDown={()=>{if(!model){handleMouseDown("bottomLeft")}}} onMouseUp={()=>{if(!model){handleMouseUp("bottomLeft")}}} onTouchStart={()=>{if(model){handleMouseDown("bottomLeft")}}} onTouchEnd={()=>{if(model){handleMouseUp("bottomLeft")}}}>
            <FaArrowUp style={{color: bg.bottomLeft}}/>
          </MonitorTopRight>  
        </MonitorItem>  
        <MonitorItem>
          <MonitorIcon onMouseDown={()=>{if(!model){handleMouseDown("left")}}} onMouseUp={()=>{if(!model){handleMouseUp("left")}}} onTouchStart={()=>{if(model){handleMouseDown("left")}}} onTouchEnd={()=>{if(model){handleMouseUp("left")}}}>
            <FaChevronLeft style={{color: bg.left}}/>
          </MonitorIcon>
        </MonitorItem>
        <MonitorItem>
          <MonitorIcon onMouseDown={()=>{if(!model){handleMouseDown("stop")}}} onMouseUp={()=>{if(!model){handleMouseUp("stop")}}} onTouchStart={()=>{if(model){handleMouseDown("stop")}}} onTouchEnd={()=>{if(model){handleMouseUp("stop")}}}>
            <FaStop style={{color: bg.stop}}/>
          </MonitorIcon>
        </MonitorItem>
        <MonitorItem>
          <MonitorIcon onMouseDown={()=>{if(!model){handleMouseDown("right")}}} onMouseUp={()=>{if(!model){handleMouseUp("right")}}} onTouchStart={()=>{if(model){handleMouseDown("right")}}} onTouchEnd={()=>{if(model){handleMouseUp("right")}}}>
            <FaChevronRight style={{color: bg.right}}/>
          </MonitorIcon>
        </MonitorItem>  
        <MonitorItem>
          <MonitorBottomLeft onMouseDown={()=>{if(!model){handleMouseDown("topRight")}}} onMouseUp={()=>{if(!model){handleMouseUp("topRight")}}} onTouchStart={()=>{if(model){handleMouseDown("topRight")}}} onTouchEnd={()=>{if(model){handleMouseUp("topRight")}}}>
            <FaArrowUp style={{color: bg.topRight}}/>
          </MonitorBottomLeft>
        </MonitorItem>
        <MonitorItem>
          <MonitorIcon onMouseDown={()=>{if(!model){handleMouseDown("top")}}} onMouseUp={()=>{if(!model){handleMouseUp("top")}}} onTouchStart={()=>{if(model){handleMouseDown("top")}}} onTouchEnd={()=>{if(model){handleMouseUp("top")}}}>
            <FaChevronDown style={{color: bg.top}}/>
          </MonitorIcon>
        </MonitorItem>
        <MonitorItem>
          <MonitorBottomRight onMouseDown={()=>{if(!model){handleMouseDown("topLeft")}}} onMouseUp={()=>{if(!model){handleMouseUp("topLeft")}}} onTouchStart={()=>{if(model){handleMouseDown("topLeft")}}} onTouchEnd={()=>{if(model){handleMouseUp("topLeft")}}}>
            <FaArrowUp style={{color: bg.topLeft}}/>
          </MonitorBottomRight>
        </MonitorItem>  
      </MonitorContainer>

    </div>
  )
}

export default Monitor