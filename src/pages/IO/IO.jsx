import React, { useCallback, useState } from 'react'
import { IOContainer, IOField, IOContent, TitleFieldItem, IOItem, IOTitle, IOSwitch, DIControl, DOControl, Control, sendAPIIO } from './io_'
import { TitleField } from '../../assets/js/globalStyle'
import { Col, Row, message } from 'antd'
import { FetchAPI } from '../../utils/api'
import { hostJS, hostServerAPI, pathPointJS, pathSetIO, portJS, portServerAPI } from '../../assets/js/avaribale'
import ButtonCustoms from '../../components/Button/ButtonCustoms'
import Buttonn from '../../components/Button/Buttonn'
import { DivConveyor, DivIO, FormIO, InputIO, SpanConveyor, TitleSpan } from './magazine_'
import {handleDisabledButton} from "../Home/homee"
import { toast } from 'react-toastify'
import Drawerr from './Drawerr'
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux"
import ButtonClick from '../../components/Button/ButtonClick'

const IO = () => {
  const {DI, DO} = useSelector((state)=>state.amr.amr)
  const [dataIO, setDataIO] = useState({jig: "", magazine: ""})
  const [dataPoint, setDataPoint] = useState([])
  const [pointMove, setPointMove] = useState({name: "", point: ""})
  const [showDrawer, setShowDrawer] = useState(false)
  const handleAddPointMove = (point)=>{
    setPointMove(point)
  }
  const handleGetPoint = async()=>{
    let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: pathPointJS})
    if(type == "succees"){
      setDataPoint(data)
      setShowDrawer(true)
    }
  }
  const handleChangeOutput = useCallback(async(id, value, e)=>{
    let data = {id, status: !value}
    let {type} = await FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path: pathSetIO, data})
    if(type == "succees"){
      toast.success(` Gửi dữ liệu thành công`)
      return
    }
    toast.error(` Gửi dữ liệu thất bại...`)
  },[])
  const handleClick =async (e, type)=>{
    let mess
    handleDisabledButton(e)
    if(type == "jig"){
      if(Number(dataIO.jig) != 0 && !Number(dataIO.jig)){
        return toast.warning("Dữ liệu không đúng !!!")
      }
      if(0 > Number(dataIO.jig) || 1000 < Number(dataIO.jig)){
        return toast.warning(` Dữ liệu phải nằm trong khoảng [0-1000]`)
      }
      let {type, message} = await sendAPIIO("gripper", "space", Number(dataIO.jig))
      toast[type](message)
    }else if(type == "magazine"){
      if(!Number(dataIO.magazine)){
        return toast.warning("Dữ liệu không đúng !!!")
      }
      if(0 > Number(dataIO.magazine) || 850 < Number(dataIO.magazine)){
        return toast.warning(` Dữ liệu phải nằm trong khoảng [0-850]`)
      }
      let {type, message} = await sendAPIIO("lift", "height", Number(dataIO.magazine))
      toast[type](message)
    }else if(type == "point"){
      if(pointMove.point && pointMove.point.startsWith("LM")){
        let {type, message} = await sendAPIIO("navigation", "id", pointMove.point)
        toast[type](message)
        return
      }
      else toast.warning("Chưa có điểm di chuyển")
    }
    // mess = `Đã gửi tín hiệu chạy ${type == "jig" ? "jig" : "bàn nâng"}`
    // toast.success(mess)
  }
  const handleIO = (e)=>{
    setDataIO({...dataIO, [e.target.name]: e.target.value})
  }
  const handleConveyor = async(e, value)=>{
    handleDisabledButton(e)
    let {type, message} = await sendAPIIO("conveyor", "type", value)
    toast[type](message)
  }
  const handleStopper = async (e, value)=>{
    handleDisabledButton(e)
    let {type, message} = await sendAPIIO("stopper", "status", value)
    toast[type](message)
  }
  return (
    <>
      <Drawerr open={showDrawer} setOpen={setShowDrawer} arrPoint={dataPoint} onChoose={handleAddPointMove}/>
      <TitleField>Input/Output</TitleField>
      <IOContainer>
        <IOField>
          <IOContent>
            {
              DI?.map(({status}, index)=>{
                return(
                  <IOItem key={index}>
                    <IOTitle>{DIControl[index]}</IOTitle>
                    {/* <Switch checkedChildren="Bật" unCheckedChildren="Tắt" disabled value={input.status}/> */}
                    <ButtonCustoms checked={status} disabled={true}/>
                  </IOItem>
                )
              })
            }
          </IOContent>
        </IOField>
        <IOField>
          <IOContent>
            {
              DO?.map(({status}, index)=>{
                return(
                  <IOItem key={index}>
                    <IOTitle>{DOControl[index]}</IOTitle>
                    <ButtonClick checked={status} onClick={handleChangeOutput} idIO={index} valueIO = {status}/>
                  </IOItem>
                )
              })
            }
          </IOContent>
        </IOField>
        <IOField>
          {/* <IOContent>
            {
              Control.map((input, index)=>{
                return(
                  <IOItem key={index}>
                    <IOTitle>{input.title}</IOTitle>
                    <ButtonCustoms checked={input.status}/>
                  </IOItem>
                )
              })
            }
          </IOContent> */}
          <div style={{marginTop: 10}}>
            <Row gutter={[0, 15]}>
              <Col xs={24} md={24} lg={12} >
                <label htmlFor='jig'>
                  <DivIO>
                    <FormIO>
                      <InputIO required id='jig' name='jig' onChange={handleIO} style={{width: "calc(100% - 150px)"}}/>
                      <TitleSpan>Chạy JIG</TitleSpan>
                      <Buttonn style={{height: 50, flex: "none", fontSize: 16, borderRadius: "0 10px 10px 0"}} onClick={(e)=>{handleClick(e, "jig")}}>Chạy Kẹp</Buttonn>
                    </FormIO>
                  </DivIO>
                </label>
              </Col>
              <Col xs={24} md={24} lg={12} >
                <label htmlFor="magazine">
                  <DivIO>
                    <FormIO>
                      <InputIO required id='magazine' name='magazine' onChange={handleIO} style={{width: "calc(100% - 150px)"}}/>
                      <TitleSpan>Chạy bàn nâng</TitleSpan>
                      <Buttonn style={{height: 50, flex: "none", fontSize: 16, borderRadius: "0 10px 10px 0"}} onClick={(e)=>{handleClick(e, "magazine")}}>Chạy bàn nâng</Buttonn>
                    </FormIO>
                  </DivIO>
                </label>
              </Col>
            </Row>
          </div>
          <div style={{marginTop: 10}}>
            <Row gutter={[0, 15]}>
              <Col xs={24} md={24} lg={12}>
                <DivConveyor style={{justifyContent: "normal", gap: 0, height: 50}}>
                  <label htmlFor="pointIo" style={{width: "100%"}}>
                    <div style={{display: "flex"}}>
                      <SpanConveyor style={{width: "180px"}}>Di chuyển</SpanConveyor>
                      <FormIO style={{width: "calc(100% - 143px)"}}>
                        <InputIO required id='pointIo' name='pointIo' value={pointMove.name} placeholder='Chọn điểm di chuyển' style={{width: "calc(100% - 150px)"}} onClick={handleGetPoint}/>
                        <Buttonn style={{height: 50, flex: "none", fontSize: 16, borderRadius: "0 10px 10px 0"}} onClick={(e)=>{handleClick(e, "point")}}>Chạy</Buttonn>
                      </FormIO>
                    </div>
                  </label>
                </DivConveyor>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <DivConveyor style={{gap: 0, justifyContent: "start"}}>
                  <SpanConveyor style={{width: "180px"}}>Băng Tải</SpanConveyor>
                  <div style={{display: "flex", justifyContent: "space-between", width: "calc(100% - 150px)", gap: 10, marginLeft: 5}}>
                    <Buttonn style={{fontSize:18, height: "100%"}} onClick={(e)=>handleConveyor(e, "cw")}> Quay Thuận</Buttonn>
                    <Buttonn style={{fontSize:18, height: "100%"}} onClick={(e)=>handleConveyor(e, "stop")}> Dừng</Buttonn>
                    <Buttonn style={{fontSize:18, height: "100%"}} onClick={(e)=>handleConveyor(e, "ccw")}> Quay nghịch</Buttonn>
                  </div>
                </DivConveyor>
              </Col>
            </Row>
            <div style={{marginTop: 10}}>
              <Row>
                <Col xs={24} md={24} lg={12}>
                  <DivConveyor style={{gap: 0, justifyContent: "start"}}>
                    <SpanConveyor style={{width: "180px"}}>Stoper</SpanConveyor>
                    <div style={{display: "flex", justifyContent: "space-between", width: "calc(100% - 150px)", gap: 10, marginLeft: 5}}>
                      <Buttonn style={{fontSize:18, height: "100%"}} onClick={(e)=>handleStopper(e, true)}> Bật</Buttonn>
                      <Buttonn style={{fontSize:18, height: "100%"}} onClick={(e)=>handleStopper(e, false)}> Tắt</Buttonn>
                      <Buttonn style={{fontSize:18, height: "100%", backgroundColor: "transparent"}}></Buttonn>
                    </div>
                  </DivConveyor>
                </Col>
              </Row>
            </div>
          </div>
        </IOField>
      </IOContainer>
    </>
  )
}

export default IO