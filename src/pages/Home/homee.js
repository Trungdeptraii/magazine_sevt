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
    height: calc(100vh - 310px);
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
    overflow: hidden;
`
export const SquareTitle = styled.div`
  text-align: center
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

export const magazineStatus = {
  0: {
    line: "",
    status: " ",
    floor: "",
  },
  1: {
    line: "45",
    // status: "Unload Magazine",
    floor: "1",
  },
  2: {
    line: "45",
    // status: "Load Magazine",
    floor: "2",
  },
  3: {
    line: "46",
    // status: "Unload Magazine",
    floor: "1",
  },
  4: {
    line: "46",
    // status: "Load Magazine",
    floor: "2",
  }
}

export const listMagazineNumber = [0, 1, 2, 3, 4]

export const ListCallContainer = styled.div`
  padding: 0 20px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px
`

export const ItemCall = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  flex-basis: calc((100% - 45px)/4);
  border-radius: 8px;
  box-shadow: 0 0 6px 1px #c5baba;

  background-color: rgba(211, 211, 211, 0.6);
  color: rgb(128 128 128);
`

export const ItemCallName = styled.div`
`
export const ItemCallWork = styled.div`
`


const callActive = keyframes`
    from {
      transform: rotate3d(0, 0, 1, 0deg);
      color: #000052
    }
    20%, 32%, 44%, 56%, 68% {
      transform: rotate3d(0, 0, 1, 0deg);
      color: #000052
    }
    23%, 35%, 47%, 59%, 71% {
      transform: rotate3d(0, 0, 1, 15deg);
      color: #000052
    }
    26%, 38%, 50%, 62%, 74% {
      transform: rotate3d(0, 0, 1, 0deg);
      color: #000052
    }
    29%, 41%, 53%, 65%, 77% {
      transform: rotate3d(0, 0, 1, -15deg);
      color: #000052
    }
    80% {
      transform:rotate3d(0, 0, 1, 0deg);
      color: #000052
    }
    100% {
      color: rgb(128 128 128);
    }
`

export const IconCall = styled.div`
    position: relative;
    width: 35px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg{
      position: absolute;
      left: 0;
    }
    & > svg:last-child{
      animation: ${callActive} 1.5s infinite linear;
    }
`
export const LabelCall = styled.div`
`
export const listRenderCall = [
  {
    line: "Line 45",
    status: "Load Jig"
  },{
    line: "Line 46",
    status: "Load Jig"
  },{
    line: "Line 45",
    status: "Load Magazine"
  },{
    line: "Line 46",
    status: "Load Magazine"
  },{
    line: "Line 45",
    status: "Unload Jig"
  },{
    line: "Line 46",
    status: "Unload Jig"
  },{
    line: "Line 45",
    status: "Unload Magazine"
  },{
    line: "Line 46",
    status: "Unload Magazine"
  },
]
const listJigStatus = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export const handleListCall = (data)=>{
  const arrListCallCustoms = [0, 0, 0, 0, 0, 0, 0, 0]
  try {
    //Load Jig Line 45
    if(listJigStatus.includes(data?.Call_LoadJig_L45)){
      arrListCallCustoms[0] = 1
    }else{
      arrListCallCustoms[0] = 0
    }
    //Load Jig Line 46
    if(listJigStatus.includes(data?.Call_LoadJig_L46)){
      arrListCallCustoms[1] = 1
    }else{
      arrListCallCustoms[1] = 0
    }
    //Load Magazine Line 45
    if(listJigStatus.includes(data?.Call_Load_Floor1_L45)|| listJigStatus.includes(data?.Call_Load_Floor2_L45)){
      arrListCallCustoms[2] = 1
    }else{
      arrListCallCustoms[2] = 0
    }
    //Load Magazine Line 46
    if(listJigStatus.includes(data?.Call_Load_Floor1_L46)|| listJigStatus.includes(data?.Call_Load_Floor2_L46)){
      arrListCallCustoms[3] = 1
    }else{
      arrListCallCustoms[3] = 0
    }
    //UnLoad Jig Line 45
    if(listJigStatus.includes(data?.Call_UnLoadJig_L45)){
      arrListCallCustoms[4] = 1
    }else{
      arrListCallCustoms[4] = 0
    }
    //UnLoad Jig Line 46
    if(listJigStatus.includes(data?.Call_UnLoadJig_L46)){
      arrListCallCustoms[5] = 1
    }else{
      arrListCallCustoms[5] = 0
    }
    //UnLoad Magazine Line 45
    if(listJigStatus.includes(data?.Call_Unload_Floor1_L45) || listJigStatus.includes(data?.Call_Unload_Floor2_L45)){
      arrListCallCustoms[6] = 1
    }else{
      arrListCallCustoms[6] = 0
    }
    //UNLoad Magazine Line 46
    if(listJigStatus.includes(data?.Call_Unload_Floor1_L46) || listJigStatus.includes(data?.Call_Unload_Floor2_L46)){
      arrListCallCustoms[7] = 1
    }else{
      arrListCallCustoms[7] = 0
    }
  } catch (error) {
    
  }
  return arrListCallCustoms
}

export const initDataMagazine = {
  line45: {
    jig: "",
    magazine: {
      type: "",
      floor: 0
    }
  },
  line46: {
    jig: "",
    magazine: {
      type: "",
      floor: 0
    }
  }
}

