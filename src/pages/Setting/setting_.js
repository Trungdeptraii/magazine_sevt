import {styled} from "styled-components"
import { Table } from "antd"
import _ from "lodash"

export const SettingContainer = styled.div`
    padding: 15px 20px;
`

export const SettingJig = styled.div`
`
export const SettingMagazine = styled.div`
`

export const columnsJig = [
    {
        title: 'Tên Model',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Trigger Name',
        dataIndex: 'triggerName',
        key: 'triggerName',
    }
]

export const columnsMagazine = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tầng 1',
        dataIndex: 'floor1_height',
        key: 'floor1_height',
    },
    {
        title: 'Chiều quay',
        dataIndex: 'floor1_conveyor',
        key: 'floor1_direct',
    },
    {
        title: 'Tầng 2',
        dataIndex: 'floor2_height',
        key: 'floor2_height',
    },
    {
        title: 'Chiều quay',
        dataIndex: 'floor2_conveyor',
        key: 'floor2_direct',
    }
]
export const SettingItemContainer = styled.div`
    background-color: rgb(250, 250, 250);
    border-radius: 10px 10px 0 0;
    border: 1px solid rgb(230, 230, 230);
    min-height: 218.28px;
`
export const SettingItemContainerHeader = styled.div`
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px 10px 0 0;
    
`
export const SettingItemTitle = styled.div`
    font-weight: 600;
    font-size: 19px;
    border-bottom: 2px solid grey;
`

export const dataTabs = [
    {
      key: 'jig',
      label: 'Jig',
    },
    {
      key: 'magazine',
      label: 'Magazinne',
    }
]

export const filterJig = (data, point="")=>{
    let obj 
    obj =  _.pick(data, ["triggerName", "openGripper", "closeGripper", "openSpace","m_delta_x", "m_delta_y", "m_delta_h","r_delta_x","r_delta_y","r_delta_h", "name"])
    obj.point = point
    return obj
}
export const filterMagazine = (data, point="")=>{
    let obj
    obj =  _.pick(data, ["triggerName", "floor1_height", "floor1_conveyor", "floor2_height","floor2_conveyor", "name"])
    obj.point = point
    return obj
}
export const dataGetAll = {
    line45: {
        jig: {
            load: {},
            unload: {}
        },
        magazine: {
            load: {},
            unload: {}
        }
    },
    line46: {
        jig: {
            load: {},
            unload: {}
        },
        magazine: {
            load: {},
            unload: {}
        }
    }
}

export const DivIO = styled.div`
    padding-left: 10px;
    margin: 0 10px;
    background-color: #eeeaf1;
    border-radius: 10px;
    position: relative;
`

export const FormIO = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    & > input{
        display: block;
        height: 100%;
        line-height: 0.8;
    }
`

export const InputIO = styled.input`
    border-radius: 8px;
    outline: none;
    border: none;
    padding-left: 15px;
    font-size: 18px;
    width: calc(100% - 132px);
    background-color: transparent;
    &:valid + span, &:focus + span{
        top: -15px;
        transition: top ease 0.3s;
        background-color: #eeeaf1;
        color: blue;
        font-weight: 700;
        border-radius: 5px 5px 0 0;
    }
    
`
export const TitleSpan = styled.span`
    font-weight: 600;
    font-size: 18px;
    position: absolute;
    display: block;
    height: 30px;
    top: calc(50% - 13px);
    left: 20px;
    padding: 0 10px;
    color: grey;
    text-align: center;
    background-color: transparent;
`

export const DivConveyor = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 0 20px 5px 20px;
    border-bottom: 1px solid rgb(230, 230, 230);
`
export const SpanConveyor = styled.div`
    display: block;
    font-size: 19px;
    font-weight: 600;
    min-height: 50px;
    display: flex;
    align-items: center;
`

export const settingCheckConveyorDir = (data)=>{
    return data.map((item)=>{
        if(item.floor1_conveyor == "cw"){
          item.floor1_conveyor = "Quay thuận"
        }else if(item.floor1_conveyor == "ccw"){
          item.floor1_conveyor = "Quay nghịch"
        }
        if(item.floor2_conveyor == "cw"){
          item.floor2_conveyor = "Quay thuận"
        }else if(item.floor2_conveyor == "ccw"){
          item.floor2_conveyor = "Quay nghịch"
        }
        return item
      })
}