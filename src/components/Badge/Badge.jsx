import React, { memo, useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { BadgeContaint, BadgeItem, BadgeMain, BadgeTitle, ItemChild, ItemMagazine, LabelTypeMagazine, handleCheckConfig, handleFetchIdModel } from '.'
import {toast} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

let stateFinishWork= [
    {
        name: "Đứng chờ",
        point: "LM100"
    },{
        name: "Về điểm chờ",
        point: "LM101"
    },{
        name: "Về điểm sạc",
        point: "LM102"
    }
]

const Badge = ({onHandle, controlAMR}) => {
    const [listModelId, setListModelId] = useState([])
    const [stateJig, setStateJig] = useState({line45: false, line46: false})
    const [stateMagazine, setStateMagazine] = useState({line45: false, line46: false})
    const [count, setCount] = useState(0)
    useEffect(()=>{
        onHandle("jig", stateJig)
    },[stateJig.line45, stateJig.line46])
    useEffect(()=>{
        onHandle("magazine", stateMagazine)
    },[stateMagazine.line45, stateMagazine.line46])
    useEffect(()=>{
        onHandle("work", stateFinishWork[count]["point"])
    }, [count])
    useEffect(()=>{
        handleFetchIdModel({path: "magazine_setting", cb1: setListModelId})
    },[])
    const handleChangeWork = ()=>{
        if(!controlAMR.run){
            setCount((count)=>{
                if(count<2){
                    return count+1
                }else{
                    return 0
                }
            })
        }
    }
  return (
    <>
    <BadgeContaint>
        <BadgeItem >
            <BadgeTitle>Chọn Line Jig</BadgeTitle>
            <BadgeMain>
                <LabelTypeMagazine>
                    <input type="checkbox" name="jigLine45" className="input_magazine" hidden checked={controlAMR.run ? controlAMR.magazine.jig.line45 : stateJig.line45} onChange={(e)=>{setStateJig({...stateJig, line45: e.target.checked})}} disabled={controlAMR.run ? true : false}/>
                    <ItemMagazine>
                        <ItemChild>Line 45</ItemChild>
                        <ItemChild>{stateJig.line45 ? "Đã chọn" : "Chưa chọn"}</ItemChild>
                    </ItemMagazine>
                </LabelTypeMagazine>
                <LabelTypeMagazine>
                    <input type="checkbox" name="jigLine46" className="input_magazine" hidden checked={controlAMR.run ? controlAMR.magazine.jig.line46 : stateJig.line46} onChange={(e)=>{setStateJig({...stateJig, line46: e.target.checked})}} disabled={controlAMR.run ? true : false}/>
                    <ItemMagazine>
                        <ItemChild>Line 46</ItemChild>
                        <ItemChild>{stateJig.line46 ? "Đã chọn" : "Chưa chọn"}</ItemChild>
                    </ItemMagazine>
                </LabelTypeMagazine>
            </BadgeMain>
        </BadgeItem>
        <BadgeItem >
            <BadgeTitle>Chọn Line Magazine</BadgeTitle>
            <BadgeMain>
                <LabelTypeMagazine>
                    <input type="checkbox" name="magazineLine45" className="input_magazine" checked={controlAMR.run ? controlAMR.magazine.magazine.line45 : stateMagazine.line45} onChange={(e)=>{setStateMagazine({...stateMagazine, line45: e.target.checked})}} hidden/>
                    <ItemMagazine>
                        <ItemChild>Line 45</ItemChild>
                        <ItemChild>{stateMagazine.line45 ? "Đã chọn" : "Chưa chọn"}</ItemChild>
                    </ItemMagazine>
                </LabelTypeMagazine>
                <LabelTypeMagazine>
                    <input type="checkbox" name="magazineLine46" className="input_magazine" hidden checked={controlAMR.run ? controlAMR.magazine.magazine.line46 : stateMagazine.line46} onChange={(e)=>{setStateMagazine({...stateMagazine, line46: e.target.checked})}}/>
                    <ItemMagazine>
                        <ItemChild>Line 46</ItemChild>
                        <ItemChild>{stateMagazine.line46 ? "Đã chọn" : "Chưa chọn"}</ItemChild>
                    </ItemMagazine>
                </LabelTypeMagazine>
            </BadgeMain>
        </BadgeItem>
        <BadgeItem onClick={handleChangeWork}>
            <BadgeTitle>Công việc khi tới điểm</BadgeTitle>
            <BadgeMain style={{alignItems: "center", justifyContent: "center"}}>
               {
                !controlAMR.run ? stateFinishWork[count].name : stateFinishWork.find((item)=>item.point == controlAMR.magazine.work).name
               }
            </BadgeMain>
        </BadgeItem>
    </BadgeContaint>
    </>

  )
}

export default memo(Badge)
