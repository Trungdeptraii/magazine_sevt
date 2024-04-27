import React, {useEffect, useMemo, useState} from 'react'
import { HeaderAMRStatus, HeaderItem, HeaderItemIcon, HeaderItemValue, HeaderItemDv, SHeader, listArrCheckFinish } from './layout'
import { useDispatch, useSelector } from 'react-redux'
import { arrFieldHeaderStatus, arrFieldHeaderStatusBoolean } from './layout'
import { hostJS, logo, pathLogJS, pathPointJS, pathRelocationJS, portJS, widthSideBar } from '../../assets/js/avaribale'
import {Space, notification, Badge, Avatar, List, Typography} from "antd"
import { findNamePoint, handleNotis, showTime } from '../../utils/clientUtil'
import { AiFillBell } from "react-icons/ai";
import ListErrors from './ListErrors'
import { writeLog } from '../../pages/Log/log_'
import { FetchAPI } from '../../utils/api'
import NotiCharge from '../../components/NotiCharge/NotiCharge'

let follow = {emergency: "", blocked: "", errors: [], message: "", arrErrors: []}

const Header = () => {
  let [arrPoint, setArrPoint] = useState([])
  let [chargingState, setCharginState] = useState(false)
  const dispath = useDispatch()
  const {amr : {data }} = useSelector((state)=>state.amr)
  const {data: controlAMR} = useSelector((state)=>state.controlAMR)

  let nameCurrent = findNamePoint({dataPoint: arrPoint, dataAMR: data})

  let charging = data?.charging ? data.charging : false
  follow.emergency = data?.emergency ? data.emergency : false
  follow.blocked = data?.blocked ? data.blocked : false
  follow.errors = data?.errors?.length ? data.errors : []
  const arrBoolen = [{blocked: data?.blocked}, {emergency: data?.emergency}]

  const [api, contextHolder] = notification.useNotification({top: '5px'});
  let [timeNoti, setTimeNoti] = useState("")
  let [open, setOpen] = useState(false)
  let [messLog, setMessLog] = useState({message: "", desc: ""})
  const openNotification = (message) => {
    api.error({
      message: `Thông báo`,
      description: message, 
      placement: "top",
      duration: 3,
      closeIcon: false,
      className: "notiCustoms",
    });
  };
  const handleNoti = ()=>{
    try {
      let time = Date.now();
      if(timeNoti && time - timeNoti >= 5000){
        let {title, message, desc} = handleNotis({emergency: follow.emergency, blocked: follow.blocked, errors: follow.errors, follow})
        if(title){
          openNotification(title)
          setTimeNoti(Date.now())
          setMessLog({message, desc})
        }else if(messLog){
          setMessLog("")
        }
        return 
      }else if(!timeNoti){
        let {title, message, desc} = handleNotis({emergency: follow.emergency, blocked: follow.blocked, errors: follow.errors})
        if(title){
          openNotification(title)
          setTimeNoti(Date.now())
          setMessLog({message, desc})
        }
        return
      }
    } catch (error) {
      
    }
  }
  const getPoint = async(path)=>{
    let {type, data} = await FetchAPI({path, port: portJS, host: hostJS})
    if(type == 'succees'){
      if(data.length){
        data.forEach((el,index)=>el.stt=index+1)
        dispath({type: `${path}/update`, payload: data})
        if(path==pathPointJS){
          setArrPoint(data)
        }
      }else{
        setArrPoint([])
      }
    }
  }
  useEffect(()=>{
    if(messLog.message){
      writeLog({content: messLog.message, current_station: nameCurrent, desc: messLog.desc})
      dispath({type: `log/update`})
      return
    }else if(charging && !chargingState){
      writeLog({content: `AMR đang sạc pin: ${(data?.battery_level *100).toFixed(0)} %`, current_station: nameCurrent, desc: "Sạc"})
      setCharginState(true)
      dispath({type: `log/update`})
    }else if(!charging && chargingState){
      writeLog({content: `AMR kết thúc sạc: ${(data?.battery_level *100).toFixed(0)} %`, current_station: nameCurrent, desc: "Sạc"})
      setCharginState(false)
      dispath({type: `log/update`})
    }
  },[messLog.message, charging])
  useEffect(()=>{
    getPoint(pathPointJS)   
    getPoint(pathRelocationJS)
    writeLog({content: "Wellcome to GUI ESA Robot", current_station: nameCurrent, desc: "Reload"})
  }, [])
  useEffect(()=>{
    if(data?.task_status == 4 && controlAMR.run && listArrCheckFinish.includes(data.current_station)){
      console.log("Reset global !!!");
      dispath({
        type: "control/update",
        payload:{
        }
      })
    }else if(data?.task_status == 6 && controlAMR.run){
      dispath({
        type: "control/update",
        payload:{
          
        }
      })
    }
  },[data?.task_status])
  handleNoti()
  return (
    <SHeader>
      <div style={{height: '50px', display: 'flex', alignItems: 'center', width: +widthSideBar, backgroundColor: "#ebf3f3", borderBottom: "2px solid grey"}}>
        <img src={logo} alt="" style={{width: "85%"}} srcSet={logo}/>
      </div>
      <HeaderAMRStatus>
        {
          arrFieldHeaderStatus.map(({icon: Icon, field, dv, label}, index)=>{
            try {
              return(
                <HeaderItem key={index} style={{width: `calc(100vw - ${widthSideBar})`}}>
                  <HeaderItemIcon><b>{data?.charging && dv=="%" ? 'Đang sạc: ' : label}</b></HeaderItemIcon>
                  <HeaderItemValue>{data[field] && dv == '%' ? `${(data[field]*100).toFixed(0)}%`: data[field] && dv == 'conf' ? data[field].toFixed(3) : data[field] ? data[field] : ''}</HeaderItemValue>
                </HeaderItem>
              )
            } catch (error) {
              
            }
          })
        }
        {
          arrFieldHeaderStatusBoolean.map(({icon: Icon, field, label}, index)=>{
            try {
              return(
                <HeaderItem key={index}>
                  <HeaderItemIcon><b>{label}</b></HeaderItemIcon>
                  <HeaderItemValue>{
                    arrBoolen.map((item, index)=>{
                      if(item[field] != undefined){
                        return item[field] ? <b key={index} style={{color: 'red'}}>Có</b> : <b key={index} style={{color: 'green'}}>Không</b>
                      }
                    })
                  }</HeaderItemValue>
                </HeaderItem>
              )
              
            } catch (error) {
              
            }
          })
        }
        <HeaderItem>
          <Space style={{width: "80px",display: "flex",justifyContent: "end"}} onClick={()=>{setOpen(!open)}}>
            <Badge count={follow.errors.length} overflowCount={10} offset={[-40, 10]}>
              <Avatar shape="circle" size="large">
                <AiFillBell style={{color: "yellow"}}/>
              </Avatar>
            </Badge>
          </Space>
        </HeaderItem>
      </HeaderAMRStatus>
      {contextHolder}
      <ListErrors data={follow.arrErrors} open={open} setOpen={setOpen}/>
      {
        chargingState ? <NotiCharge percent={data?.battery_level} /> : ""
      }
    </SHeader>
  )
}

export default Header