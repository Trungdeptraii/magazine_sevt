import {styled} from 'styled-components'
import { FetchAPI } from '../../../../utils/api'
import { hostJS, portJS } from '../../../../assets/js/avaribale'
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
    position: relative;
    & input, & button{
        height: 40px;
        font-size: 16px;
    }
    input[id="robotx"]:valid + span, input[id="machinex"]:valid + span, input[id="gripperOpen"]:valid + span, input[id="gripperDoor"]:valid + span{
        visibility: visible;
        top: -18px;
        color: rgb(100 100 100);
        font-weight: 400;
        border-radius: 5px 5px 0 0;
        background-color: white;
    }
    input[id="roboty"]:valid + span, input[id="machiney"]:valid + span, input[id="gripperClose"]:valid + span, input[id="closeSpace1"]:valid + span{
        visibility: visible;
        top: -18px;
        color: rgb(100 100 100);
        font-weight: 400;
        left: 165px;
        border-radius: 5px 5px 0 0;
        background-color: white;
    } //closeSpace
    input[id="roboth"]:valid + span, input[id="machineh"]:valid + span, input[id="closeSpace2"]:valid + span{
        visibility: visible;
        top: -18px;
        color: rgb(100 100 100);
        font-weight: 400;
        left: 325px;
        border-radius: 5px 5px 0 0;
        background-color: white;
    }
`
export const InputForm = styled.input`
    border-radius: 5px;
    outline: none;
    border: 1px solid #d9d9d9;
    padding-left: 15px;
    font-size: 18px;
    flex-basis: 32%;
    max-width: 32%;
    background-color: white !important;
    &:focus{
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1)
    }
    &::placeholder{
        color: grey;
        font-weight: 400;
        font-size: 15px;
    }
`
export const SpanForm = styled.span`
    font-size: 17px;
    position: absolute;
    display: block;
    font-weight: 400;
    height: 30px;
    top: calc(50% - 15px);
    left: 5px;
    padding: 0 10px;
    color: #d9d9d9;
    text-align: center;
    background-color: transparent;
    visibility: hidden;
    transition: top ease 0.3s;

`

export const initialState = {
    name: "",
    triggerName:"",
    openGripper:"",
    closeGripper:"",
    openSpace:"",
    closeSpace1:"",
    closeSpace2:"",
    m_delta_x:"",
    m_delta_y:"",
    m_delta_h:"",
    r_delta_x:"",
    r_delta_y:"",
    r_delta_h:""
}

export const iniitalValidate = {
    "name": "",
    "triggerName": "",
    "gripper": "",
    "door": "",
    "machine": "",
    "robot": ""
}

export const checkDeleteModel = async(cb)=>{
    let arr = [];
    let {data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: "magazine_setting"})
    data.forEach((item)=>{
        if(item.modelId){
            arr.push(item.modelId)
        }
    })
    cb(arr)
}