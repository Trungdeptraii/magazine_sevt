import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchAPI } from '../../utils/api'
import { gifEsa, hostJS, hostServerAPI, pathCancel, pathNavigation, portJS, portServerAPI } from '../../assets/js/avaribale'
import { Button, Space, Steps, notification } from 'antd'
import { initialPoint } from './index'
import Drawerr from './Drawer'
import StepAMR from './StepAMR'
import {PlusCircleFilled } from '@ant-design/icons';
import AddPoint from './AddPoint'
import moment from 'moment'
import { showTime } from '../../utils/clientUtil'
import Loadding from '../Loadding/Loadding.jsx'
import { writeLog } from '../Log/log_'
import { TitleField } from '../../assets/js/globalStyle.js'
import {toast} from "react-toastify"

let timeoutMove

const TaskMove = () => {

  const [monitor, setMonitor] = useState(initialPoint) //arrData View
  const {amr: {data}} = useSelector((state)=>{return state.amr}) // status Data AMR
  const [arrPoint, setArrpoint] = useState([]) //Data Json-server all point created
  const [showAddpoint, setShowAddPoint] = useState(false)
  let [time, setTime]= useState()
  let [arrPointActive, setArrPointActive] = useState({point: []})
  let [currentStep, setCurrentStep] = useState(0)
  let [titleTaskStatus, setTitleTaskStatus] = useState('Dừng')
  const [open, setOpen] = useState(false);

  const current_station = data?.current_station;
  const task_status = data?.task_status;
  const handleMoveAMR = async()=>{
    if(current_station != arrPointActive.point[0].point && arrPointActive.status == 'idle'){
      let dataAPI = {area:"plastic_supply",floor:"1",id:arrPointActive.point[0].point, type: 'return'}
      let {type} = await FetchAPI({method: 'POST', path: pathNavigation, host: hostServerAPI, port: portServerAPI, data: dataAPI})
      if(type == "succees"){
        setCurrentStep(currentStep+1)
        setMonitor({...monitor, point: monitor.point.map((item, index)=>{
          if(index==currentStep+1){
            item.status = 'Đang thực hiện'
          }
          if(index==0 && !item.time){
            item.name = 'Bắt đầu'
            item.status = 'Thời gian'
            item.time = showTime({type: "hours"})
          }
          return item
        })})
        setArrPointActive({...arrPointActive, status: "pending"})
      }
    }else if(current_station == arrPointActive.point[0].point && task_status == 4 && arrPointActive.status == 'pending'){
      console.log('Đợi');
      //Check time 3s thi AMR di chuyen
      timeoutMove = setTimeout(()=>{
        setArrPointActive({status: "idle", point: arrPointActive.point.slice(1)})
        clearTimeout(timeoutMove)
      }, 3000)
      setArrPointActive({...arrPointActive, status: "idle"})
      setMonitor({...monitor, point: monitor.point.map((item, index)=>{
        if(index==currentStep && !item.time && index!=0){
          item.status = 'Hoàn thành'
          item.time = showTime({type: "hours"})
        }
        return item
      })})
      writeLog({desc: "Hoàn thành", content: `Đã tới vị trí ${arrPointActive.point[0].name}`, current_station})
    }
    setTime(Date.now())
  }
  if(arrPointActive.point.length){
    if(!time){
      handleMoveAMR()
    }
    else if((Date.now()- time) > 500){
      handleMoveAMR()
      // console.log(current_station, arrPointActive, currentStep);
    }
  }
  const handleStart = ()=>{
    setArrPointActive({status: "idle", point: monitor.point.slice(1)})
  }
  const showDrawer = ()=>{
    setOpen(true)
  }
  const handleDeleteArrPoint = (point)=>{
    setMonitor({...monitor, point: monitor.point.filter((item)=>item != point)})
    toast.success(`Đã xóa điểm ${point.name}`)
  }
  const getArrPoint = async ()=>{
    let {type, data} = await FetchAPI({method: 'GET', host: hostJS, port: portJS, path: 'point'})
    if(type == 'succees'){
      setArrpoint(data.map((el)=>{return {...el, status: 'Đang chờ', time: ''}}))
      setMonitor({...monitor, point: [{name: "Sẵn sàng", status: "Đang đợi công việc", time: ''}]})
    }
  }
  const handleCancel = async()=>{
    let dataCancel = {type: "cancel"}
    let {type, data} = await FetchAPI({method: 'POST', host: hostServerAPI, port: portServerAPI, path: pathCancel, data: dataCancel})
    if(type == 'succees'){
      toast.success(' Đã gửi lệnh Hủy tới AMR')
      return
    }
    toast.error('Gửi lệnh thất bại')
  }
  const handleStop = async (status)=>{
    let dataCancel
    if(status != 3){
      dataCancel = {type: "pause"}
    }else if(status == 3){
      dataCancel = {type: "contitue"}
    }
    let {type, data} = await FetchAPI({method: 'POST', host: hostServerAPI, port: portServerAPI, path: pathCancel, data: dataCancel})
    if(type == 'succees'){
      toast.success(` Đã gửi lệnh ${dataCancel.type == 'pause' ? 'dừng' : 'tiếp tục'} tới AMR`)
      return
    }
    toast.error('Gửi lệnh thất bại')
  }
  const handleClear = ()=>{
    setCurrentStep(0)
    setMonitor({status: 'idle', point:[{name: "Sẵn sàng", status: "Đang đợi công việc", time: ""}]})
    clearTimeout(timeoutMove)
  }
  useEffect(()=>{
   getArrPoint()
  }, [])
  return (
    <div>
      <TitleField>Nhiệm vụ</TitleField>
      <Space>
        <Button type="primary" size='large' icon={<PlusCircleFilled />} style={{display: 'flex', alignItems: 'center'}} onClick={()=>{setShowAddPoint(true)}}>
          Thêm điểm
        </Button>
        <Button type='primary' size='large' onClick={showDrawer}>Chỉnh sửa điểm</Button>
        <Button type='primary' size='large' onClick={handleStart}>Start</Button>
        <Button type='primary' size='large' onClick={()=>{handleStop(task_status)}}>{titleTaskStatus}</Button>
        <Button type='primary' size='large' onClick={handleCancel}>Hủy</Button>
        <Button type='primary' size='large' onClick={handleClear}>Clear</Button>
      </Space>
      <Drawerr open={open} setOpen={setOpen} arrPoint={monitor.point} onDelete={handleDeleteArrPoint}/>
      <StepAMR data={monitor.point} current={currentStep}/>
      {
        showAddpoint ? <AddPoint arrPoint={arrPoint} monitor={monitor} setMonitor={setMonitor} setOpen={setShowAddPoint} open={showAddpoint}/> : ""
      }
    </div>
  )
}

export default TaskMove
