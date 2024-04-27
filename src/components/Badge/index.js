import {keyframes, styled} from "styled-components"
import { Robot, hostJS, hostServerAPI, portJS, portServerAPI } from "../../assets/js/avaribale"
import { FetchAPI } from "../../utils/api"
import { toast } from "react-toastify"
import { Segmented } from 'antd';

export const BadgeContaint = styled.div`
    height: 100%;
    width: 25%;
    display: flex;
    gap: 8px;
    flex-direction: column
`
export const BadgeItem = styled.div`
    flex-basis: calc(100% / 3);
    /* max-width: calc(100% / 3); */
    /* background-color: #1da1f2; */
    position: relative;
    box-shadow: 0 0 2px 2px #f5dede;
    color: black;
    border-radius: 5px;
    position: relative;
    overflow-y: auto;

`
export const BadgeTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding-top: 5px;
    display: flex;
    align-items: center;
    padding-left: 20px;
`
export const BadgeMain = styled.div`
    font-size: 30px;
    font-weight: 700;
    height: calc(100% - 35px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`
export const LabelTypeMagazine = styled.label`
    display: block;
    height: 50%;
    /* background-color: grey; */
    margin: 0 5px;
    input[class="input_magazine"]:checked + div{
        border-bottom: 2px solid green;
        & > span:last-child{
            color: green;
        }
        &::after{
            background-color: green;
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 3px;
            transform: translateY(1px);
            margin-right: 5px;
            position: absolute;
            left: 3px;
        }
    }
`
export const ItemMagazine = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 19px;
    padding-left: 10px;
    border-bottom: 1px solid grey;
    position: relative;
    padding-left: 25px;
    &::before{
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid green;
        border-radius: 3px;
        transform: translateY(1px);
        margin-right: 5px;
        position: absolute;
        left: 0;
    }

`
export const ItemChild = styled.span`
    flex: 1;
`
export const HomeMagazine = styled.div`
    height: 100%;
    display: flex;
    padding: 5px 0;
    gap: 8px
`
export const InfoHomeMagazine = styled.div`
    width: 75%;
`
export const PointMoveHomeMagazine = styled.div`
    height: 66.3%;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #f5dede;
`
export const ShowJigHomeMagazine = styled.div`
    margin-top: 8px;
    height: calc(33.7% - 8px);
    display: flex;
    gap: 8px;
`
export const InfoJig = styled.div`
    width: 66%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #f5dede;
    padding-left: 20px;
`
export const InfoMagazine = styled.div`
    flex: 1;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #f5dede;
    padding-left: 20px;
    overflow: hidden;
`
const ring = keyframes`
0% { transform: rotate(0); }
  1% { transform: rotate(30deg); }
  3% { transform: rotate(-28deg); }
  5% { transform: rotate(34deg); }
  7% { transform: rotate(-32deg); }
  9% { transform: rotate(30deg); }
  11% { transform: rotate(-28deg); }
  13% { transform: rotate(26deg); }
  15% { transform: rotate(-24deg); }
  17% { transform: rotate(22deg); }
  19% { transform: rotate(-20deg); }
  21% { transform: rotate(18deg); }
  23% { transform: rotate(-16deg); }
  25% { transform: rotate(14deg); }
  27% { transform: rotate(-12deg); }
  29% { transform: rotate(10deg); }
  31% { transform: rotate(-8deg); }
  33% { transform: rotate(6deg); }
  35% { transform: rotate(-4deg); }
  37% { transform: rotate(2deg); }
  39% { transform: rotate(-1deg); }
  41% { transform: rotate(1deg); }
  43% { transform: rotate(0); }
  100% { transform: rotate(0); }
`
export const TitleInfoMagazine = styled.div`
    font-size: 20px;
    font-weight: 700;
    padding-top: 5px;
    display: flex;
    align-items: center;
    & > svg{
        margin-right: 5px;
        color: darkslateblue;
    }
    & > .noti{
        animation: ${ring} 4s linear infinite
    }
`
export const ContentInfoMagazine = styled.div`
    height: calc(100% - 35px);
    display: flex;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    flex-direction: column;
    justify-content: space-evenly;
`
export const ContentInfoMagazineItem = styled.div`
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    & > svg {
        color: grey;
    }
`
export const ContentInfoMagazineItemTitle = styled.span`
    margin-left: 5px;
`
export const ContentInfoMagazineItemValue = styled.span`
    margin-left: 10px;
`

export const ContentInfoJig = styled.div`
    height: calc(100% - 35px);
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-evenly;
    font-weight: 600;
    font-size: 30px;
    overflow-y: auto;
`
export const ContentInfoJigItem = styled.div`
    flex-basis: 33.33%;
    max-width: 33.33%;
    border-radius: 5px;
    border: 2px solid gainsboro;
    color: gainsboro;
    height: 100%;
    padding-top: 5px;
`
export const InfoJigItemTitle = styled.div`
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    height: 25px;
`
export const InfoJigItemIcon = styled.div`
    height: calc(100% - 25px);
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 45px;
        margin-bottom: 5px;
        color: gainsboro;
    }
`
export const handleCheckConfig = async (path, id)=>{
    let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: `${path}/${id}`})
    if(!data.name){
        let type;
        type = path== "jig_get_45" ? "Model load Jig Line 45" : path== "jig_return_45" ? "Model unload Jig Line 45" : path== "jig_get_46" ? "Model load Jig Line 46" :
        path== "jig_return_46" ? "Model unload Jig Line 46" : path == "magazine_load_45" ? "Load Magazine Line 45" : path == "magazine_unload_45"  ? "Unload Magazine Line 45" :
        path == "magazine_load_46" ? "Load Magazine Line 46" : path == "magazine_unload_46" ? "Unload Magazine Line 46" : ""
    }
}
export const handleFetchIdModel = async({method="GET", path="", dataSend={}, cb1=""})=>{
  let {type, data} = await FetchAPI({method, host: hostJS, port: portJS, path, data: dataSend})
  if(type == "succees"){
    let obj = {}
    data.forEach(({id, modelId})=>obj[id] = modelId)
    cb1(obj)
  }
} 

export const senserON = {
  parent: {
    color: "black",
    border: "2px solid green"
  },
  children: {
    color: "green"
  }
}
export const senserOFF = {
  parent: {
    border: "2px solid gainsboro",
    color: "gainsboro"
  },
  children: {
    color: "gainsboro"
  }
}

export const ManualMagazine = styled.div`
    flex-basis: calc(100% - (100% / 3) + 15px);
    box-shadow: 0 0 2px 2px #f5dede;
    color: black;
    border-radius: 5px;
`
export const SegmentedCustom = styled(Segmented)`
    margin-top: 15px;
    padding: 0 5px;
    & > .ant-segmented-group label.ant-segmented-item-selected{
        background-color: #1677ff;
        color: white;
        font-weight: 600;
    }
    & > .ant-segmented-group div{
        min-height: 35px;
        line-height: 35px;
    }
`
export const WorkMagazineContent = styled.div`
    margin-top: 15px;
`
export const WorkMagazine = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 17px;
`

export const WorkTitleMagazine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const SpanTitleWork = styled.span`
    font-weight: 600;
`
export const TextManual = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    font-size: 18px;
    line-height: 25px;
`
export const itemsLine = 
[
    {
    value: 'line 45',
    label: 'Line 45',
    },
    {
    value: 'line 46',
    label: 'Line 46',
    }
]

export const itemsWork = 
[
    {
    value: 'load',
    label: 'Load',
    },
    {
    value: 'unload',
    label: 'Unload',
    }
]

export const itemsFloor = 
[
    {
    value: 1,
    label: 'Tầng 1',
    },
    {
    value: 2,
    label: 'Tầng 2',
    }
]

export const initialMagazine = {
    line: "line 45",
    work: "load",
    floor: 1,
    mode: "jig"
}

export const switchModeAuto = async(line)=>{
    let {type} = await FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path: "line_auto", data: {line}})
    if(type == "succees"){
    toast.success(`Đã gửi tín hiệu chạy Auto: ${line.includes("45") ? "Line 45" : "Line 46"}`)
  }else if(type == "fail"){
    toast.warning(`Gửi tín hiệu chuyển line thất bại...`)
  }else if(type == "error"){
    toast.error("Không có phản hồi từ server")
  }
}