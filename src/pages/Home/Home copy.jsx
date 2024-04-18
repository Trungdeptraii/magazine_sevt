import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ContaintStatus,HomeContainer, HomePreview, HomeStatus, IconCall, ItemCall, ItemCallName, ItemCallWork, ItemStatus, LabelCall, ListCallContainer, Square, SquareTitle, TitleItemStatus, fnTaskStatus, getField, handleCheckConfig, handleDisabledButton, handleFetchIdModel, listMagazineNumber, magazineStatus, sendRun } from './homee'
import { Progress, Space, message  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hostJS, hostServerAPI, pathLogJS, pathPointJS, portJS, portServerAPI, speedMax } from '../../assets/js/avaribale';
import { FetchAPI } from '../../utils/api';
import { TitleField } from '../../assets/js/globalStyle';
import { Robot as RobotName } from '../../assets/js/avaribale';
import Buttonn from '../../components/Button/Buttonn';
import { createId, findNamePoint } from '../../utils/clientUtil';
import Badge from '../../components/Badge/Badge';
import { writeLog } from '../Log/log_';
import { FaParachuteBox, FaPhoneVolume} from "react-icons/fa6"; 
import {_} from "lodash"
import { ContentInfoJig, ContentInfoJigItem, ContentInfoMagazine, HomeMagazine, InfoHomeMagazine, InfoJig, InfoJigItemIcon, InfoJigItemTitle, InfoMagazine, PointMoveHomeMagazine, ShowJigHomeMagazine, TitleInfoMagazine } from '../../components/Badge';
import { toast } from 'react-toastify';

const conicColors = {
  '0%': '#ff0000',
  '20%': '#eb4d26',
  '40%': '#ecb234',
  '60%': '#01fa22'
};
let senserON = {
  parent: {
    color: "black",
    border: "2px solid green"
  },
  children: {
    color: "green"
  }
}
let sensorOFF = {
  parent: {
    border: "2px solid gainsboro",
    color: "gainsboro"
  },
  children: {
    color: "gainsboro"
  }
}
let percentDist= 0, showDist= 0.0
const Home = () => {
  const dispath = useDispatch();
  const {arrPoint} = useSelector((state)=>{return state.point})
  const {data: controlAMR} = useSelector((state)=>{return state.controlAMR})
  const {amr: {data, jig_status, magazine_status, message: messageAMR, call: callAMR}} = useSelector((state)=>{return state.amr})
  const [listCall, setListCall] = useState([])
  let nameCurrent = findNamePoint({dataPoint: arrPoint, dataAMR: data})
  //Start Magazine
  const [listModelId, setListModelId] = useState({})
  const [arrNamePoint, setArrNamePoint] = useState({})
  const [dataMagazine, setDataMagazine] = useState({
    jig: {
      line45: false,
      line46: false
    },
    magazine: {
      line45: false,
      line46: false
    },
    work: {
      point: ""
    }
  })

  const handleDataMagazine = useCallback((type, value)=>{
    setDataMagazine({...dataMagazine, [type]: value})
  },[dataMagazine.jig.line45, dataMagazine.jig.line46, dataMagazine.magazine.line45, dataMagazine.magazine.line46, dataMagazine.work.point])


  //End Magazine
  const [targetDist, setTargetDist] = useState(0);
  const [targetId, setTargetId] = useState("")
  const {log: logEvent} = useSelector((state)=>{return state.logEvent})
  let speed = Math.abs(data?.vx) ? (Math.abs(data?.vx) / speedMax)*100 : 0;
  let battery = data?.battery_level ? (data?.battery_level*100).toFixed(0) : 0;
  let emergency = data?.emergency  ? data.emergency : false;
  let blocked = data?.blocked  ? data.blocked : false;
  let errors = data?.errors  ? data.errors : [];
  let taskStatus = data?.task_status  ? data.task_status : 0;
  const handleFomatSpeed = ((percent)=>{
    return (percent/100).toFixed(2) + ` m/s`
  })
  const handleFomatTerm = (()=>{
    return showDist + ` m`
  })
  const getPoint = async()=>{
    let {type, data} = await FetchAPI({path:pathPointJS, port: portJS, host: hostJS})
    if(type == 'succees'){
      if(data.length){
        data.forEach((el,index)=>el.stt=index+1)
        dispath({type: 'point/update', payload: data})
      }
    }
  }
  let messageStatus = useMemo (()=>{
    if(messageAMR?.message){
      return messageAMR.message
    }else return "Chưa có công việc"
  }, [messageAMR?.message])
  useEffect(()=>{
    getPoint()
    handleFetchIdModel({path: "magazine_setting", cb1: setListModelId, cb2: setArrNamePoint})
  }, [])
  useEffect(()=>{
    let calls = []
    if(callAMR?.length){
      callAMR.forEach((call)=>{
        calls = [...calls, ...call.status]
      })
      setListCall(calls)
    }
  }, [callAMR?.length])
  useEffect(()=>{
    let time = setTimeout(()=>{
      if(!targetId){
        let target = data?.unfinished_path?.length ? data.unfinished_path[data.unfinished_path.length-1] : "";
        let result = arrPoint.find((item)=>item.point == target)
        setTargetId(result?.name ? result.name: target)
        if(target && controlAMR.start){
          let idLog = createId(5)
          writeLog({current_station: nameCurrent, desc: "Đang thực hiện", content: ` Di chuyển tới điểm ${result?.name ? result.name: target}`, id: idLog})
          dispath({
            type: "control/update",
            payload:{
              ...controlAMR,
              cancel: false,
              run: true,
              time: target && !controlAMR.time ? Date.now() : "",
              id: idLog,
              start: false,
              magazine: dataMagazine
            }})
          dispath({type: "log/update"})
        }
      }else if(!data?.unfinished_path.length){
        setTargetId("")
      }
    }, 500)
    return ()=>{
      clearTimeout(time)
    }
  }, [data?.unfinished_path?.length])
  
  useEffect(()=>{
    if(!data?.target_dist){
      setTargetDist(0)
      percentDist = 0
    }else{
      if(!targetDist){
        setTargetDist(data.target_dist)
      }
    }
  },[data?.target_dist])

  if(targetDist){
    try {
      percentDist = (((targetDist - data?.target_dist)/targetDist)*100).toFixed(0)
      showDist = `${(data.target_dist).toFixed(2)}`
    } catch (error) {
      percentDist = 0
      showDist = 0.0
    }
  }
  const handleRunAMR = async(e)=>{
    handleDisabledButton(e)
    if(dataMagazine.jig.line45){
      if(!arrNamePoint.jig_get_45 || !arrNamePoint.jig_return_45){
        let name
        if(!arrNamePoint.jig_get_45){
          name = "load Jig line 45"
        }else if(!arrNamePoint.jig_return_45){
          name = "unload Jig line 45"
        }
        return toast.error(`Chưa khởi tạo điểm làm việc ${name}`)
      }
      let result
      sendRun.line45.jig = true
      result = await handleCheckConfig("jig_get_45", listModelId["jig_get_45"])
      if(result){
        return toast.error(`Chưa khởi tạo cấu hình ${result}`)
      }
      result = await handleCheckConfig("jig_return_45", listModelId["jig_return_45"])
      if(result){
        return toast.error(`Chưa khởi tạo cấu hình ${result}`)
      }
    }
    if(dataMagazine.jig.line46){
      if(!arrNamePoint.jig_get_46 || !arrNamePoint.jig_return_46){
        let name
        if(!arrNamePoint.jig_get_46){
          name = "load Jig line 46"
        }else if(!arrNamePoint.jig_return_46){
          name = "unload Jig line 46"
        }
        return toast.error(`Chưa khởi tạo điểm làm việc ${name}`)
      }
      let result
      sendRun.line46.jig = true
      result = await handleCheckConfig("jig_get_46", listModelId["jig_get_46"])
      if(result){
        toast.error(`Chưa khởi tạo cấu hình ${result}`)
        return
      }
      result = await handleCheckConfig("jig_return_46", listModelId["jig_return_46"])
      if(result){
        toast.error(`Chưa khởi tạo cấu hình ${result}`)
        return
      }
    }
    if(dataMagazine.magazine.line45){
      if(!arrNamePoint.magazine_load_45 || !arrNamePoint.magazine_unload_45){
        let name
        if(!arrNamePoint.magazine_load_45){
          name = "load Magazine line 45"
        }else if(!arrNamePoint.magazine_unload_45){
          name = "unload Magazine line 45"
        }
        return toast.error(`Chưa khởi tạo điểm làm việc ${name}`)
      }
      let result
      sendRun.line45.magazine = true
      result = await handleCheckConfig("magazine_load_45", listModelId["magazine_load_45"])
      if(result){
        toast.error(`Chưa khởi tạo cấu hình ${result}`)
        return
      }
      result = await handleCheckConfig("magazine_unload_45", listModelId["magazine_unload_45"])
      if(result){
        toast.error(`Chưa khởi tạo cấu hình ${result}`)
        return
      }
    }
    if(dataMagazine.magazine.line46){
      if(!arrNamePoint.magazine_load_46 || !arrNamePoint.magazine_unload_46){
        let name
        if(!arrNamePoint.magazine_load_46){
          name = "load Magazine line 46"
        }else if(!arrNamePoint.magazine_unload_46){
          name = "unload Magazine line 46"
        }
        return toast.error(`Chưa khởi tạo điểm làm việc ${name}`)
      }
      let result
      sendRun.line46.magazine = true
      result = await handleCheckConfig("magazine_load_46", listModelId["magazine_load_46"])
      if(result){
        toast.error(`Chưa khởi tạo cấu hình ${result}`)
        return
      }
      result = await handleCheckConfig("magazine_unload_46", listModelId["magazine_unload_46"])
      if(result){
        toast.error(`Chưa khởi tạo cấu hình ${result}`)
        return
      }
    }
    if(!dataMagazine.jig.line45 && !dataMagazine.jig.line46 && !dataMagazine.magazine.line45 && !dataMagazine.magazine.line46){
      return toast.warning("Chưa chọn công việc...")
    }
    let {type} = await FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path: "run", data: sendRun})
    if(type == "succees"){
      toast.success("Gửi lệnh chạy thành công")
    }else if(type == "fail"){
      toast.warning("Gửi lệnh thất bại...")
    }else if(type == "error"){
      toast.error("Không có phản hồi từ server...")
    }
    dispath(
      {
        type: "control/update",
        payload: {
          start: true
        }
    })
  }
  const handleCancelAMR = useCallback((e)=>{
    handleDisabledButton(e)
    if(controlAMR.id){
      FetchAPI({method: "DELETE", port: portJS, host: hostJS, path: `${pathLogJS}/${controlAMR.id}`})
      writeLog({current_station: data.current_station, desc: "Hủy", content: ` Hủy di chuyển tới điểm ${controlAMR.targetId}`})
      dispath({
        type: "log/update"
      })
    }
    dispath({
      type: "control/update",
      payload:{
        run: false,
        cancel: true,
        stop: false,
        work: [],
        goStandBy: false,
        goCharge: false
      }
    })
  }, [controlAMR?.id])
  const handleRunStop = useCallback((e)=>{
    let status;
    if(data?.task_status!=3){
      status = "stop"
    }else{
      status = "resume"
    }
    dispath({
      type: "control/update",
      payload:{
        ...controlAMR,
        stop: status,
      }
    })
    handleDisabledButton(e)
  }, [data?.task_status])
  const handleGoStandBy = useCallback((e)=>{
    dispath({
      type: "control/update",
      payload:{
        run: true,
        cancel: false,
        goStandBy: true,
        goCharge: false,
        work: []
      }
    })
    handleDisabledButton(e)
  }, [])
  const handleGoCharge = useCallback((e)=>{
    dispath({
      type: "control/update",
      payload:{
        ...controlAMR,
        cancel: false,
        goStandBy: false,
        goCharge: true,
        work: []
      }
    })
    handleDisabledButton(e)
  }, [])
  // console.log(controlAMR);
  return (
    <HomeContainer>
      <TitleField>Trang chủ</TitleField>
      <HomeStatus>
        <ContaintStatus>
          <ItemStatus>
            <Progress type="circle" percent={Math.floor(battery)} strokeColor={conicColors}/>
            <TitleItemStatus>Pin</TitleItemStatus>
          </ItemStatus>
          <ItemStatus>
            <Progress type="dashboard" percent={speed.toFixed(2)} format={handleFomatSpeed} strokeColor={"orange"}/>
            <TitleItemStatus>Tốc độ</TitleItemStatus>
          </ItemStatus>
          <ItemStatus>
            <Progress type="dashboard" percent={percentDist} strokeColor={conicColors} format={handleFomatTerm}/>
            <TitleItemStatus>Khoảng cách</TitleItemStatus>
          </ItemStatus>
          <ItemStatus>
            <Square>
              <SquareTitle>{nameCurrent}</SquareTitle>
            </Square>
            <TitleItemStatus>Điểm hiện tại</TitleItemStatus>
          </ItemStatus>
          <ItemStatus>
            <Square>
              <SquareTitle>{`${targetId ? targetId : nameCurrent}`}</SquareTitle>
            </Square>
            <TitleItemStatus>Điểm đích</TitleItemStatus>
          </ItemStatus>
          <ItemStatus>
            <Square>
              <SquareTitle>{`${fnTaskStatus(emergency, blocked, taskStatus, errors)}`}</SquareTitle>
            </Square>
            <TitleItemStatus>Trạng thái</TitleItemStatus>
          </ItemStatus>
        </ContaintStatus>
      </HomeStatus>
      <HomePreview>
        <div style={{height: "100%"}}>
          {/* 
          <ContentLog style={{marginTop: 8}} ref={heightLog}>
              <Log pageSize={heightLog?.current?.clientHeight > 400 ? pageLogFull : pageLog} event={logEvent}/>
          </ContentLog> */}
          <HomeMagazine >
            <Badge onHandle={handleDataMagazine} controlAMR={controlAMR} messageAMR={messageStatus}/>
            <InfoHomeMagazine>
              <PointMoveHomeMagazine>
                <TitleInfoMagazine style={{paddingLeft: 20}}>Trạng thái các bộ gọi</TitleInfoMagazine>
                <ListCallContainer>
                  <ItemCall>
                    <IconCall> <FaPhoneVolume /> </IconCall>
                    <LabelCall>
                      <ItemCallName>Line 45</ItemCallName>
                      <ItemCallWork>Load Jig</ItemCallWork>
                    </LabelCall>
                  </ItemCall>
                  <ItemCall>
                    <IconCall> <FaPhoneVolume /> </IconCall>
                    <LabelCall>
                      <ItemCallName>Line 45</ItemCallName>
                      <ItemCallWork>Load Jig</ItemCallWork>
                    </LabelCall>
                  </ItemCall>
                  <ItemCall>
                    <IconCall> <FaPhoneVolume /> </IconCall>
                    <LabelCall>
                      <ItemCallName>Line 45</ItemCallName>
                      <ItemCallWork>Load Jig</ItemCallWork>
                    </LabelCall>
                  </ItemCall>
                  <ItemCall>
                    <IconCall> <FaPhoneVolume /> </IconCall>
                    <LabelCall>
                      <ItemCallName>Line 45</ItemCallName>
                      <ItemCallWork>Load Jig</ItemCallWork>
                    </LabelCall>
                  </ItemCall>
                  <ItemCall>
                    <IconCall> <FaPhoneVolume /> </IconCall>
                    <LabelCall>
                      <ItemCallName>Line 45</ItemCallName>
                      <ItemCallWork>Load Jig</ItemCallWork>
                    </LabelCall>
                  </ItemCall>
                </ListCallContainer>
              </PointMoveHomeMagazine>
              <ShowJigHomeMagazine>
                <InfoMagazine>
                  <TitleInfoMagazine>Trạng thái Magazine</TitleInfoMagazine>
                  <ContentInfoMagazine>
                    <span style={{textAlign: "left", lineHeight: 1.2}}>{listMagazineNumber.includes(magazine_status) ? `${magazineStatus[magazine_status.toString()].line} ${magazineStatus[magazine_status.toString()].floor} ${magazineStatus[magazine_status.toString()].status}` : magazineStatus["0"].status }</span>
                  </ContentInfoMagazine>
                </InfoMagazine>
                <InfoJig>
                  <TitleInfoMagazine>Trạng thái Jig</TitleInfoMagazine>
                  <ContentInfoJig>
                    <ContentInfoJigItem style={jig_status && jig_status[0] == 1 ? {...senserON.parent} : {...sensorOFF.parent}}>
                      <InfoJigItemIcon>
                        <FaParachuteBox style={jig_status && jig_status[0] == 1 ? {...senserON.children} : {...sensorOFF.children}}/>
                      </InfoJigItemIcon>
                      <InfoJigItemTitle>VT 1</InfoJigItemTitle>
                    </ContentInfoJigItem>
                    <ContentInfoJigItem style={jig_status && jig_status[1] == 1 ? {...senserON.parent} : {...sensorOFF.parent}}>
                      <InfoJigItemIcon>
                        <FaParachuteBox style={jig_status && jig_status[1] == 1 ? {...senserON.children} : {...sensorOFF.children}}/>
                      </InfoJigItemIcon>
                      <InfoJigItemTitle>VT 2</InfoJigItemTitle>
                    </ContentInfoJigItem>
                  </ContentInfoJig>
                </InfoJig>
                
              </ShowJigHomeMagazine>
            </InfoHomeMagazine>
          </HomeMagazine>
        </div>
        {
          <Space style={{width: "100%", display: "flex", justifyContent: "space-between", gap: 20}}>
          <Buttonn onClick={handleRunAMR} style={{backgroundColor: controlAMR.run ? "limegreen" : "#1677ff", height: 50, fontSize: 20}}>Chạy</Buttonn>
          <Buttonn onClick={handleRunStop} style={{backgroundColor: taskStatus == 3 ? "orange": "#1677ff", height: 50, fontSize: 20}}>{taskStatus == 3 ? "Tiếp tục" : "Dừng"}</Buttonn>
          <Buttonn onClick={handleCancelAMR} style={{height: 50, fontSize: 20}}>Hủy</Buttonn>
          <Buttonn onClick={handleGoStandBy} style={{height: 50, fontSize: 20}}>StandBy</Buttonn>
          <Buttonn onClick={handleGoCharge} style={{height: 50, fontSize: 20}}>Sạc</Buttonn>
        </Space>
        }
      </HomePreview>
    </HomeContainer>
  )
}

export default Home