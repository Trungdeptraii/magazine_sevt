import { Button, message } from 'antd'
import {styled, keyframes} from 'styled-components'
import { Robot, hostJS, portJS } from '../../assets/js/avaribale'
import { FetchAPI } from '../../utils/api'

export const HomeContainer = styled.div`
    /* height: 100%; */
    margin-right: 5px
`
export const HomeTitle = styled.h1`
`

export const HomeStatus = styled.div`
    border-radius: 8px;
    border: 2px solid black;
    height: 171px;
    overflow: hidden;
    position: relative;
    padding: 10px 10px 5px 10px;
`

export const HomePreview = styled.div`
    position: relative;
    height: calc(100vh - 270px);
`
export const ContentLog = styled.div`
    /* position: absolute; */
    inset: 0;
    padding-top: 10px;
    background-color: white;
    box-shadow: 0 0 2px 2px #f5dede;
    padding-left: 5px;
    width: ${Robot == "Rhythm" ? "100%" : "75%"};
`
export const SpanTitleFiled = styled.span`
    background-color: white;
    position: absolute;
    height: 35px;
    padding: 5px 10px;
    top: -27px;
    left: 20px;
    font-size: 20px;
    font-weight: 600;
`
export const ContaintStatus = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    gap: 30px;
    justify-content: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
`
export const ItemStatus = styled.div`
`
export const TitleItemStatus = styled.b`
    display: block;
    text-align: center;
    font-size: 18px;
    margin-top: 5px;
`

//hinh vuong
export const Square = styled.div`
    border-radius: 10px;
    height: 120px;
    width: 200px;
    box-shadow: 1px 1px 2px 5px #f3f0f0;
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: center;
    font-size: 25px;
    font-weight: 600;
`
export const SquareTitle = styled.div`
`
export const fnTaskStatus = (emergency, blocked, taskStatus, errors)=>{
    if(emergency || blocked || taskStatus == 3){
      return `Dừng`
    }else if(errors.length){
      return `Lỗi`
    }else if(taskStatus == 2){
      return `Di chuyển`
    }else if(taskStatus == 4){
      return `Đã tới điểm`
    }else if(taskStatus == 6){
      return `Rảnh`
    }
    return ""
}

//Setup MEN
export let dataGroup = {
  group_1:["Main1","Main4","Main7","Main10","Main13","Main16","Main19","Main22","Main25","Main28","Main31","Main34","Main37","Main40"],
  group_2:["Main2","Main5","Main8","Main11","Main14","Main17","Main20","Main23","Main26","Main29","Main32","Main35","Main38","Main41"],
  group_3:["Main3","Main6","Main9","Main12","Main15","Main18","Main21","Main24","Main27","Main30","Main33","Main36","Main39","Main42"],
}
let pointSMD = [
  { 
    reverse: [],
    front: ["Main1", "Main2", "Main3"],
    point: "LM20"
  },{
    reverse: ["Main1", "Main2", "Main3"],
    front: ["Main4", "Main5", "Main6"],
    point: "LM21"
  },{
    reverse: ["Main4", "Main5", "Main6"],
    front: ["Main7", "Main8", "Main9"],
    point: "LM22"
  },{
    reverse: ["Main7", "Main8", "Main9"],
    front: ["Main10", "Main11", "Main12"],
    point: "LM23"
  },{
    reverse: ["Main10", "Main11", "Main12"],
    front: ["Main13", "Main14", "Main15"],
    point: "LM24"
  },{
    reverse: ["Main13", "Main14", "Main15"],
    front: ["Main16", "Main17", "Main18"],
    point: "LM25"
  },{
    reverse: ["Main16", "Main17", "Main18"],
    front: ["Main19", "Main20", "Main21"],
    point: "LM26"
  },{
    reverse: ["Main19", "Main20", "Main21"],
    front: ["Main22", "Main23", "Main24"],
    point: "LM27"
  },{
    reverse: ["Main22", "Main23", "Main24"],
    front: ["Main25", "Main26", "Main27"],
    point: "LM28"
  },{
    reverse: ["Main25", "Main26", "Main27"],
    front: ["Main28", "Main29", "Main30"],
    point: "LM29"
  },{
    reverse: ["Main28", "Main29", "Main30"],
    front: ["Main31", "Main32", "Main33"],
    point: "LM30"
  },{
    reverse: ["Main31", "Main32", "Main33"],
    front: ["Main34", "Main35", "Main36"],
    point: "LM31"
  },{
    reverse: ["Main34", "Main35", "Main36"],
    front: ["Main37", "Main38", "Main39"],
    point: "LM32"
  },{
    reverse: ["Main37", "Main38", "Main39"],
    front: ["Main40", "Main41", "Main42"],
    point: "LM33"
  }
]
let pointMain = [
    { 
      reverse: [],
      front: ["Main1", "Main2", "Main3"],
      point: "LM40"
    },{
      reverse: ["Main1", "Main2", "Main3"],
      front: ["Main4", "Main5", "Main6"],
      point: "LM41"
    },{
      reverse: ["Main4", "Main5", "Main6"],
      front: ["Main7", "Main8", "Main9"],
      point: "LM42"
    },{
      reverse: ["Main7", "Main8", "Main9"],
      front: ["Main10", "Main11", "Main12"],
      point: "LM43"
    },{
      reverse: ["Main10", "Main11", "Main12"],
      front: ["Main13", "Main14", "Main15"],
      point: "LM44"
    },{
      reverse: ["Main13", "Main14", "Main15"],
      front: ["Main16", "Main17", "Main18"],
      point: "LM45"
    },{
      reverse: ["Main16", "Main17", "Main18"],
      front: ["Main19", "Main20", "Main21"],
      point: "LM46"
    },{
      reverse: ["Main19", "Main20", "Main21"],
      front: ["Main22", "Main23", "Main24"],
      point: "LM47"
    },{
      reverse: ["Main22", "Main23", "Main24"],
      front: ["Main25", "Main26", "Main27"],
      point: "LM48"
    },{
      reverse: ["Main25", "Main26", "Main27"],
      front: ["Main28", "Main29", "Main30"],
      point: "LM49"
    },{
      reverse: ["Main28", "Main29", "Main30"],
      front: ["Main31", "Main32", "Main33"],
      point: "LM50"
    },{
      reverse: ["Main31", "Main32", "Main33"],
      front: ["Main34", "Main35", "Main36"],
      point: "LM51"
    },{
      reverse: ["Main34", "Main35", "Main36"],
      front: ["Main37", "Main38", "Main39"],
      point: "LM52"
    },{
      reverse: ["Main37", "Main38", "Main39"],
      front: ["Main40", "Main41", "Main42"],
      point: "LM53"
    }
  ]
function renderPoint(group="", type="smd"){
    if(type == "smd"){
        return pointSMD.filter((item)=>item.reverse.includes(group) || item.front.includes(group))
    }else if(type == "main"){
        return pointMain.filter((item)=>item.reverse.includes(group) || item.front.includes(group))
    }
}
export  function pointMEN({group_1="", group_2="", group_3=""}, type="smd"){
  let arrGroup1 = renderPoint(group_1, type).map((group)=>group.point)
  let arrGroup2 = renderPoint(group_2, type).map((group)=>group.point)
  let arrGroup3 = renderPoint(group_3, type).map((group)=>group.point)
  let point = [...arrGroup1, ...arrGroup2, ...arrGroup3]
  return Array.from(new Set(point)).sort()
}
export const initialGroup = {
    group_1: "",
    group_2: "",
    group_3: "",
}

export const pageLog = 4
export const pageLogFull = 7

export const ButtonControl = styled(Button)`
  flex: 1;
  width: 150px;
  font-weight: 700;
  background-color: #1677ff
`
export const handleDisabledButton = (e, timeSet=1500)=>{
  e.target.disabled = true;
  e.target.style.backgroundColor = "#62748d"
  e.target.style.color = "lightgrey"
  e.target.classList.add("active")
  let time = setTimeout(()=>{
    e.target.disabled = false;
    e.target.style.backgroundColor = "rgb(22, 119, 255)";
    e.target.style.color = "white"
   e.target.classList.remove("active")
    clearTimeout(time)
  }, timeSet)
}

export const handleFetchIdModel = async({method="GET", path="", dataSend={}, cb1="", cb2=""})=>{
  let {type, data} = await FetchAPI({method, host: hostJS, port: portJS, path, data: dataSend})
  if(type == "succees"){
    let obj = {}
    let obj2 = {}
    data.forEach(({id, modelId, namePoint})=>{
      obj[id] = modelId
      obj2[id] = namePoint
    })
    cb1(obj)
    cb2(obj2)
  }
} 

export const getField = ()=>{
  return ["name","triggerName", "openGripper", "closeGripper", "m_delta_x", "m_delta_y", "m_delta_z"
  ,"r_delta_x", "r_delta_y", "r_delta_z"]
}

export const handleCheckConfig = async (path, id, cb)=>{
    let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: `${path}/${id}`})
    if(!data.name){
      let type;
      type = path== "jig_get_45" ? "Model load Jig Line 45" : path== "jig_return_45" ? "Model unload Jig Line 45" : path== "jig_get_46" ? "Model load Jig Line 46" :
      path== "jig_return_46" ? "Model unload Jig Line 46" : path == "magazine_load_45" ? "Load Magazine Line 45" : path == "magazine_unload_45"  ? "Unload Magazine Line 45" :
      path == "magazine_load_46" ? "Load Magazine Line 46" : path == "magazine_unload_46" ? "Unload Magazine Line 46" : ""
      return type
    }
    return false
}
export const sendRun = {
  line45: {
    jig: false,
    magazine: false
  },
  line46: {
    jig: false,
    magazine: false
  }
}