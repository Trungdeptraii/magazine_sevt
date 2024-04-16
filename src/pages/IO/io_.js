import { Switch } from "antd"
import {styled} from "styled-components"
import { FetchAPI } from "../../utils/api"
import { hostServerAPI, portServerAPI } from "../../assets/js/avaribale"

export const IOContainer = styled.div`
    display: grid;
    /* grid-template-columns: auto auto auto; */
    height: calc(100% - 60px);
    gap: 20px;
    margin-right: 5px;
`
export const IOField = styled.div`
    background-color: white;
    box-shadow: 0 0 5px 5px gainsboro;
    border-radius: 10px;
    padding: 10px 15px;
`
export const TitleFieldItem = styled.div`
    font-size: 22px;
    font-weight: 600;
`
export const IOContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`
export const IOItem = styled.div`
    flex-basis: 10%;
`
export const IOTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`
export const IOSwitch = styled(Switch)`
`

export const DIControl = ["Sensor 1", "Sensor 2", "Sensor 3", "Sensor 4", "Sensor 5", "Sensor 6", "Sensor M1", "Sensor M2", "Sensor M3", "Sensor M4", "Sensor M5", "Sensor M6"]

export const DOControl = ["DO 1", "DO 2", "DO 3", "DO 4", "DO 5", "DO 6", "DO 7", "DO 8", "DO 9", "DO 10", ]
export const Control = [
    {
        id: 1,
        title: "Control1",
        status: false
    },
    {
        id: 2,
        title: "Control2",
        status: true
    },
    {
        id: 3,
        title: "Control3",
        status: false
    },
    {
        id: 4,
        title: "Control4",
        status: false
    },
    {
        id: 5,
        title: "Control5",
        status: true
    },
    {
        id: 6,
        title: "Control6",
        status: false
    },
    {
        id: 7,
        title: "Control7",
        status: false
    },
    {
        id: 8,
        title: "Control8",
        status: false
    },
    {
        id: 9,
        title: "Control9",
        status: false
    }
]

export const sendAPIIO = async(path, title, value)=>{
    let {type} =  await FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path, data: {[title]: value}})
    if(type == "succees"){
        return {
            type: "success",
            message: "Gửi dữ liệu thành công"
        }
    }else if(type == "fail"){
        return {
            type: "warning",
            message: "Gửi dữ liệu không thành công"
        }
    }else if(type == "error"){
        return {
            type: "error",
            message: "Server không phản hồi"
        }
    }
}