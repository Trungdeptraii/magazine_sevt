import {styled} from 'styled-components'
import { FetchAPI } from '../../utils/api'
import {hostJS, hostServerAPI, logo, portJS, portServerAPI} from "../../assets/js/avaribale"

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
        height: 40px;
        font-size: 16px;
    }
`

export const checkDeletePoint = async(cb)=>{
    let arr = [];
    let {data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: "magazine_setting"})
    data.forEach((item)=>{
        if(item.namePoint){
            arr.push(item.namePoint)
        }
    })
    cb(arr)
}
