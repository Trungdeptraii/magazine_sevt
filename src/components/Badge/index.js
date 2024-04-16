import {styled} from "styled-components"
import { Robot, hostJS, portJS } from "../../assets/js/avaribale"
import { FetchAPI } from "../../utils/api"
import { toast } from "react-toastify"

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
`
export const BadgeTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding-top: 5px
`
export const BadgeMain = styled.div`
    font-size: 40px;
    font-weight: 700;
    height: calc(100% - 35px);
    padding: 10px 0;
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
    width: 60%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #f5dede;
`
export const InfoMagazine = styled.div`
    flex: 1;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #f5dede;
`
export const TitleInfoMagazine = styled.div`
    padding-left: 30px;
    font-size: 20px;
    font-weight: 700;
    padding-top: 5px;
`
export const ContentInfoMagazine = styled.div`
    height: calc(100% - 35px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 35px;
`
export const ContentInfoJig = styled.div`
    height: calc(100% - 35px);
    display: flex;
    align-items: center;
    padding: 5px 10px;
    gap: 8px;
    justify-content: center;
`
export const ContentInfoJigItem = styled.div`
    flex-basis: 33.33%;
    max-width: 33.33%;
    border-radius: 5px;
    border: 2px solid gainsboro;
    color: gainsboro;
    height: 100%;
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
        font-size: 65px;
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
