import React, { memo, useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { BadgeContaint, BadgeItem, BadgeMain, BadgeTitle, ItemChild, ItemMagazine, LabelTypeMagazine, handleCheckConfig, handleFetchIdModel, ContentInfoJig, ContentInfoJigItem, InfoJigItemIcon, InfoJigItemTitle, senserON, senserOFF, ManualMagazine, SegmentedCustom, WorkMagazine, WorkMagazineContent, WorkTitleMagazine, SpanTitleWork, itemsLine, itemsWork, itemsFloor, initialMagazine, TextManual, switchModeAuto } from '.'
import { FaParachuteBox, FaRetweet, FaPlus, FaFileCirclePlus } from "react-icons/fa6"; 
import {toast} from "react-toastify"
import { Select, Button, Space } from 'antd';

import 'react-toastify/dist/ReactToastify.css';

const Badge = ({onHandle, controlAMR, jigVT1, jigVT2, mode, idle, lineAuto}) => {
    const [stateMagazine, setStateMagazine] = useState("jig")
    const [data, setData] = useState(initialMagazine)
    const handleMode = (value)=>{
        if(idle){
            if(value.includes("Magazine")){
                setStateMagazine("magazine")
                setData({...data,mode: "magazine"})
                onHandle({line: data.line, mode: "magazine", floor: data.floor, work: data.work})
            }else if(value.includes("Jig")){
                setStateMagazine("jig")
                setData({...data, mode: "jig"})
                onHandle({line: data.line, mode: "jig", floor: data.floor, work: data.work})
            }
            return
        }
        toast.warning("Không thể thay đổi công việc - AMR đang chạy")
    }
    const handleModeAuto = (value)=>{
        if(value.includes("45")){
            switchModeAuto("line45")
        }else if(value.includes("46")){
            switchModeAuto("line46")
        }
    }
    useEffect(()=>{
        if(controlAMR?.magazine && !mode){
            let data = initialMagazine;
            data.floor = controlAMR.magazine.line45.magazine.floor ? controlAMR.magazine.line45.magazine.floor : controlAMR.magazine.line46.magazine.floor ? controlAMR.magazine.line46.magazine.floor : 1;
            data.work = controlAMR.magazine.line45.jig ? controlAMR.magazine.line45.jig : controlAMR.magazine.line46.jig ? controlAMR.magazine.line46.jig :
            controlAMR.magazine.line45.magazine.type ? controlAMR.magazine.line45.magazine.type : controlAMR.magazine.line46.magazine.type ? controlAMR.magazine.line46.magazine.type : "";
            data.mode = controlAMR.magazine.line45.jig || controlAMR.magazine.line46.jig ?  "jig" :
            controlAMR.magazine.line45.magazine.type || controlAMR.magazine.line46.magazine.type ? "magazine" : ""
            data.line = controlAMR.magazine.line45.jig || controlAMR.magazine.line45.magazine.type ? "line 45" : controlAMR.magazine.line46.jig || controlAMR.magazine.line46.magazine.type ? "line 46" : ""
            setData(data)
        }
    },[controlAMR?.magazine, mode])
    const handleLine = (line)=>{
        if(idle){
            setData({...data, line})
            onHandle({line: line, mode: data.mode, floor: data.floor, work: data.work})
            return
        }
        toast.warning("Không thể thay đổi công việc - AMR đang chạy")
    }
    const handleWork = (work)=>{
        if(idle){
            setData({...data, work})
            onHandle({line: data.line, mode: data.mode, floor: data.floor, work: work})
            return
        }
        toast.warning("Không thể thay đổi công việc - AMR đang chạy")
    }
    const handleFloor = (floor)=>{
        if(idle){
            setData({...data, floor})
            onHandle({line: data.line, mode: data.mode, floor: floor, work: data.work})
            return
        }
        toast.warning("Không thể thay đổi công việc - AMR đang chạy")
    }
  return (
    <>
    <BadgeContaint>
        <ManualMagazine>
            <BadgeTitle style={{textAlign: "left", paddingLeft: 20, alignItems: "center"}}><FaFileCirclePlus style={{marginRight: 5}}/>
                {mode ? `Chọn Line Auto: ${lineAuto.includes("45") ? "Line 45" : "Line 46"}` : "Chọn công việc Manual"}
            </BadgeTitle>
            {
                mode ? 
                <SegmentedCustom options={["Line 45", "Line 46"]} block className='segmentedCustom' 
                    defaultValue={"Line 45"} 
                    onChange={handleModeAuto}
                    value={lineAuto == "line45" ? "Line 45" : lineAuto == "line46" ? "Line 46" : ""}
                />
                :
                <>

                    <SegmentedCustom options={["Chạy Jig", "Chạy Magazine"]} block className='segmentedCustom' 
                        defaultValue={"Chạy Jig"} 
                        onChange={handleMode}
                        value={data.mode == "magazine" ? "Chạy Magazine" : data.mode == "jig" ? "Chạy Jig" : ""}
                    />
                    <WorkMagazine>
                        <WorkTitleMagazine>
                            <SpanTitleWork>Line:</SpanTitleWork>
                            <Select
                                value={data.line}
                                style={{
                                    width: 120,
                                    height: 35
                                }}
                                onChange={handleLine}
                                options={itemsLine}
                            />
                        </WorkTitleMagazine>
                        <WorkTitleMagazine>
                            <SpanTitleWork>Công việc:</SpanTitleWork>
                            <Select
                                value={data.work}
                                style={{
                                    width: 120,
                                    height: 35
                                }}
                                onChange={handleWork}
                                options={itemsWork}
                            />
                        </WorkTitleMagazine>
                        {
                            stateMagazine == "magazine" || data.mode == "magazine" ? 
                            <WorkTitleMagazine>
                                <SpanTitleWork>Tầng:</SpanTitleWork>
                                <Select
                                    value={data.floor}
                                    style={{
                                        width: 120,
                                        height: 35
                                    }}
                                    onChange={handleFloor}
                                    options={itemsFloor}
                                /> 
                            </WorkTitleMagazine> : ""
                        }
                    </WorkMagazine>
                </>
            }
        </ManualMagazine>
        <BadgeItem >
            <BadgeTitle style={{textAlign: "left", paddingLeft: 20, alignItems: "center"}}><FaRetweet style={{marginRight: 5, color: "darkgreen"}}/>Trạng thái Jig</BadgeTitle>
            <BadgeMain style={{textAlign: "left", paddingLeft: 20, display: "flex", justifyContent: "center"}}>
                <ContentInfoJig style={{height: "initial"}}> 
                    <ContentInfoJigItem style={jigVT1 && jigVT1 == 1 ? {...senserON.parent} : {...senserOFF.parent}}>
                      <InfoJigItemIcon>
                        <FaParachuteBox style={jigVT1 && jigVT1 == 1 ? {...senserON.children} : {...senserOFF.children}}/>
                      </InfoJigItemIcon>
                      <InfoJigItemTitle>VT 1</InfoJigItemTitle>
                    </ContentInfoJigItem>
                    <ContentInfoJigItem style={jigVT2 && jigVT2 == 1 ? {...senserON.parent} : {...senserOFF.parent}}>
                      <InfoJigItemIcon>
                        <FaParachuteBox style={jigVT2 && jigVT2 == 1 ? {...senserON.children} : {...senserOFF.children}}/>
                      </InfoJigItemIcon>
                      <InfoJigItemTitle>VT 2</InfoJigItemTitle>
                    </ContentInfoJigItem>
                </ContentInfoJig>
            </BadgeMain>
        </BadgeItem>
    </BadgeContaint>
    </>

  )
}

export default memo(Badge)
