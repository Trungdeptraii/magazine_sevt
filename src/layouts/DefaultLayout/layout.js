import styled from "styled-components";
import { layoutStyle, widthSideBar } from "../../assets/js/avaribale";
import { Button, Menu } from 'antd';
import { FaBatteryHalf, FaLocationCrosshairs } from "react-icons/fa6";


export const Layout = styled.div`
    display: flex;
    gap: 5px;
    height: calc(100vh - ${layoutStyle.heightHeader} - ${layoutStyle.heightFooter});
`

export const Main = styled.div`
    /* padding: 20px 10px 0 0; */
    width: 100%;
`

export const SHeader = styled.header`
    width: 100%;
    display: flex;
`
export const SFooter = styled.footer`
    height: ${layoutStyle.heightFooter};
    width: 100%;
    padding: 10px 0 10px 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 50px;
`
export const MenuSideBar = styled(Menu)`
    height: 50%;
    padding-right: 5px;
    background-color: inherit;
`
export const HeaderAMRStatus = styled.div`
    height: 50px;
    background-color: #ebf3f3;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 0 20px 0 5px;
    border-bottom:  2px solid grey;
    width: calc(100% - ${widthSideBar}px);
    justify-content: space-between;
`
export const HeaderItem = styled.div`
    display: flex;
    font-size: 18px;
    gap: 5px;
    justify-content: space-between;
`
export const HeaderItemIcon = styled.span`
`
export const HeaderItemValue = styled.span`
`
export const HeaderItemDv = styled.span`
`
export const arrFieldHeaderStatus = [
    {
        icon: FaBatteryHalf ,
        label: 'Pin: ',
        field: 'battery_level',
        dv: '%'
    },
    {
        icon: FaLocationCrosshairs,
        label: 'Độ chính xác: ',
        field: 'confidence',
        dv: "conf"
    },
    {
        icon: FaLocationCrosshairs,
        label: 'Bản đồ: ',
        field: 'current_map',
    },
    
]
export const arrFieldHeaderStatusBoolean = [
    {
        icon: FaLocationCrosshairs,
        label: 'Vật cản: ',
        field: 'blocked',
        dv: ''
    },
    {
        icon: FaLocationCrosshairs,
        label: 'EMG: ',
        field: 'emergency',
    }
]