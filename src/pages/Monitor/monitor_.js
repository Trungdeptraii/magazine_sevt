import {styled} from "styled-components"
import { FetchAPI } from "../../utils/api"
import { hostServerAPI, pathMonitor, portServerAPI } from "../../assets/js/avaribale"

export const MonitorContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    gap: 10px;
    height: calc(100vh - 150px);
    padding-bottom: 10px;
`
export const MonitorItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ghostwhite;
`
export const MonitorIcon = styled.div`
    svg{
        font-size: 150px;
    }
`
export const MonitorTopLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 120px;
        transform: rotate(-45deg);
    }
`
export const MonitorTopRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 120px;
        transform: rotate(45deg);
    }
`
export const MonitorBottomLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 120px;
        transform: rotate(-135deg);
    }
`

export const MonitorBottomRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 120px;
        transform: rotate(135deg);
    }
`

export const bgInitial = {
    topLeft: "grey",
    top: "grey",
    topRight: "grey",
    left: "grey",
    stop: "grey",
    right: "grey",
    bottomLeft: "grey",
    bottom: "grey",
    bottomRight: "grey",
}

export const settingInitial = {
    speed: 0.1,
    rotate: 5
}
export const dataMove = {
    vx: 0.3,
    w: (10*Math.PI/180).toFixed(2)
}

export const LayoutForm = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(80, 78, 76, 0.5);
    align-items: center;
    justify-content: center;
    z-index: 10
`
export const DivInput = styled.div`
    display: flex;
    gap: 10px;
    height: 40px;
    & input, & button{
        font-size: 16px;
        height: 40px;
    }
`
export const validateMonitor = ({speed, rotate},setValidate)=>{
    let speedValue = Math.abs(speed)
    let rotateValue = Math.abs(rotate)
    if(!speedValue && rotateValue){
        setValidate({speed: "Vui lòng nhập tốc độ chạy", rotate: ""})
        return true
    }else if(!speedValue>=Number(1.0)&& rotateValue){
        setValidate({speed: "Tốc độ chạy phải nhỏ hơn 1.0 m/s", rotate: ""})
        return true
    }else if(+speedValue>=Number(1.0)&& rotateValue){
        setValidate({speed: "Tốc độ chạy phải nhỏ hơn 1.0 m/s", rotate: ""})
        return true
    }else if(!speedValue && !rotateValue){
        setValidate({speed: "Vui lòng nhập tốc độ chạy", rotate: "Vui lòng nhập tốc độ xoay"})
        return true
    }else if(speedValue && !rotateValue){
        setValidate({speed: "", rotate: "Vui lòng nhập tốc độ xoay"})
        return true
    }else if(speedValue && rotateValue >= 20){
        setValidate({speed: "", rotate: "Tốc độ chạy phải nhỏ hơn 20 °/s"})
        return true
    }
    return false
}

export const handleMonitor = async(arrow, {vx, w})=>{
    let data = {vx, vy: 0, w, duration: 0}
    if(arrow == "topRight"){
        data.vx = vx;
        data.w = -w
    }else if(arrow == "top"){
        data.vx = vx;
        data.w = 0
    }
    else if(arrow == "topLeft"){
        data.vx = vx;
        data.w = w
    }else if(arrow == "left"){
        data.vx = 0;
        data.w = w
    }
    else if(arrow == "stop"){
        data.vx = 0
        data.w = 0
    }else if(arrow == "right"){
        data.vx = 0;
        data.w = -w
    }
    else if(arrow == "bottomLeft"){
        data.vx = -vx
        data.w = -w
    }else if(arrow == "bottom"){
        data.vx = -vx
        data.w = 0
    }
    else if(arrow == "bottomRight"){
        data.vx = -vx
        data.w = w
    }
    FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path: pathMonitor, data: {type: "monitor", data}}) 
}
export const modelSelected = [
  {
    value: true,
    label: "Cảm ứng"
  },{
    value: false,
    label: "Chuột"
  }
]
export const modeSelected = [
  {
    value: true,
    label: "Nhấn nhả"
  },{
    value: false,
    label: "Nhấn giữ"
  }
]
let dataGroup = {
    group_1:["Main1","Main4","Main7","Main10","Main13","Main16","Main19","Main22","Main25","Main28","Main31","Main34","Main37","Main40"],
    group_2:["Main2","Main5","Main8","Main11","Main14","Main17","Main20","Main23","Main26","Main29","Main32","Main35","Main38","Main41"],
    group_3:["Main3","Main6","Main9","Main12","Main15","Main18","Main21","Main24","Main27","Main30","Main33","Main36","Main39","Main42"],
}