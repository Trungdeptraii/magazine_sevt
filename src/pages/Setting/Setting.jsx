import React, { useEffect, useId, useState } from 'react'
import { Col, Collapse, Row, Button, Table, Drawer, Tabs } from 'antd'
import { SettingContainer, SettingJig, SettingMagazine, columnsJig, dataGetAll, dataTabs, filterJig, filterMagazine, settingCheckConveyorDir } from './setting_'
import { TitleField } from '../../assets/js/globalStyle'
import { AiFillPlusCircle } from "react-icons/ai";
import Buttonn from '../../components/Button/Buttonn';
import { FetchAPI } from '../../utils/api';
import { hostJS, portJS } from '../../assets/js/avaribale';
import Drawerr from './Drawerr';
import {checkResultAPI, createId} from '../../utils/clientUtil'
import SettingJigItem from './SettingJigItem';

let pathMagazine = "magazine_setting"

const Setting = () => {
    const handleChangeTab = (value)=>{
        setTab(value)
    }
    let [tab, setTab] = useState("jig");
    const [title, setTitle] = useState("")
    const [openDrawer, setOpenDrawer] = useState(false)
    const [dataChoose, setDataChoose] = useState([])
    const [setting, setSetting] = useState([])
    const [namePoint, setNamePoint] = useState([])
    const [jig, setJig] = useState({
        jig_get_45: [{}],
        jig_get_46: [{}],
        jig_return_45: [{}],
        jig_return_46: [{}],
    })
    const [magazine, setMagazine] = useState({
        magazine_load_45: [{}],
        magazine_load_46: [{}],
        magazine_unload_45: [{}],
        magazine_unload_46: [{}],
    })
    const getData = async ({types="", path="", targetData=""})=>{
        let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path})
        if(type == "succees"){
            if(targetData){
                if(path == pathMagazine){
                    let obj = {}
                    let objName = {}
                    data.forEach(({id, modelId, namePoint, point})=>{
                        obj[id] = modelId
                        objName[id] = {namePoint: namePoint, point: point}
                    })
                    setSetting(obj)
                    setNamePoint(objName)
                }
            }
        }
    }
    const getDataChoose = async (path)=>{
        let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path})
        if(type == "succees"){
            setDataChoose(data)
        }else{
            setDataChoose([])
        }
    }
    const promiseData = async (types, id)=>{
        let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: `${types}/${id}`})
        if(type == "succees"){
            if(tab == "jig"){
                setJig({...jig, [types]: [data]})
            }else if(tab == "magazine"){
                setMagazine({...magazine, [types]: [data]})
            }
        }else {
            if(tab == "jig"){
                setJig({...jig, [types]: [data]})
            }else if(tab == "magazine"){
                setMagazine({...magazine, [types]: [data]})
            }
        }
    }
    const getAllData = async ()=>{
        if(tab == "jig"){
            let jig_get_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_get_45/${setting["jig_get_45"]}`})
            let jig_get_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_get_46/${setting["jig_get_46"]}`})
            let jig_return_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_return_45/${setting["jig_return_45"]}`})
            let jig_return_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_return_46/${setting["jig_return_46"]}`})
            let [a, b, c, d] = await Promise.all([jig_get_45, jig_get_46, jig_return_45, jig_return_46])
            let data = {
                jig_get_45: a.type == "succees" && !Array.isArray(a.data) ? [a.data] : [{}],
                jig_get_46: b.type == "succees" && !Array.isArray(b.data) ? [b.data] : [{}],
                jig_return_45: c.type == "succees" && !Array.isArray(c.data) ? [c.data] : [{}],
                jig_return_46: d.type == "succees" && !Array.isArray(d.data) ? [d.data] : [{}]
            }
            setJig(data)
        }else if(tab == "magazine"){
            let magazine_load_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_load_45/${setting["magazine_load_45"]}`})
            let magazine_load_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_load_46/${setting["magazine_load_46"]}`})
            let magazine_unload_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_unload_45/${setting["magazine_unload_45"]}`})
            let magazine_unload_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_unload_46/${setting["magazine_unload_46"]}`})
            let [a, b, c, d] = await Promise.all([magazine_load_45, magazine_load_46, magazine_unload_45, magazine_unload_46])
            let data = {
                magazine_load_45: a.type == "succees" && !Array.isArray(a.data) ? settingCheckConveyorDir([a.data]) : [{}],
                magazine_load_46: b.type == "succees" && !Array.isArray(b.data) ? settingCheckConveyorDir([b.data]) : [{}],
                magazine_unload_45: c.type == "succees" && !Array.isArray(c.data) ? settingCheckConveyorDir([c.data]) : [{}],
                magazine_unload_46: d.type == "succees" && !Array.isArray(d.data) ? settingCheckConveyorDir([d.data]) : [{}]
            }
            setMagazine(data)
        }
    }
    useEffect(()=>{
        let time = setTimeout(()=>{
            getAllData()
        }, 500)
        return ()=>{
            clearTimeout(time)
        }
    }, [setting.length, tab])
    useEffect(()=>{
        getData({path: pathMagazine, targetData: setSetting})
    }, [])
    const handleChangeJig = async(path)=>{
        await getDataChoose(path)
        setTitle(path)
        setOpenDrawer(true)
    }
    const handleAddName = async (item, title, type)=>{
        let data={}
        if(type == "not_point"){
            data.modelId = item.id
        }else if(type == "point"){
            data.point = item.point, 
            data.namePoint = item.name
        }
        await FetchAPI({method: "PATCH", host: hostJS, port: portJS, path: `${pathMagazine}/${title}`, data})
        await getData({path: pathMagazine, targetData: setSetting})
        if(type == "not_point"){
            promiseData(title, item.id)
        }
    }
    const handleGetData = async()=>{
        let jig_get_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_get_45/${setting["jig_get_45"]}`})
        let jig_return_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_return_45/${setting["jig_return_45"]}`})
        let magazine_load_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_load_45/${setting["magazine_load_45"]}`})
        let magazine_unload_45 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_unload_45/${setting["magazine_unload_45"]}`})
        let [a, b, c, d] = await Promise.all([jig_get_45, jig_return_45, magazine_load_45, magazine_unload_45])
        dataGetAll.line45.jig.load = a.type == "succees" && !Array.isArray(a.data) ? filterJig(a.data, namePoint.jig_get_45.point) : {}
        dataGetAll.line45.jig.unload = b.type == "succees" && !Array.isArray(b.data) ? filterJig(b.data, namePoint.jig_return_45.point) : {}
        dataGetAll.line45.magazine.load = c.type == "succees" && !Array.isArray(c.data) ? filterMagazine(c.data, namePoint.magazine_load_45.point) : {}
        dataGetAll.line45.magazine.unload = d.type == "succees" && !Array.isArray(d.data) ? filterMagazine(d.data, namePoint.magazine_unload_45.point) : {}
        let jig_get_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_get_46/${setting["jig_get_46"]}`})
        let jig_return_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_return_46/${setting["jig_return_46"]}`})
        let magazine_load_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_load_46/${setting["magazine_load_46"]}`})
        let magazine_unload_46 = FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_unload_46/${setting["magazine_unload_46"]}`})
        let [e, f, g, h] = await Promise.all([jig_get_46, jig_return_46, magazine_load_46, magazine_unload_46])
        dataGetAll.line46.jig.load = e.type == "succees" && !Array.isArray([e.data]) ? filterJig(e.data, namePoint.jig_get_46.point) : {}
        dataGetAll.line46.jig.unload = f.type == "succees" && !Array.isArray(f.data) ? filterJig(f.data, namePoint.jig_return_46.point) : {}
        dataGetAll.line46.magazine.load = g.type == "succees" && !Array.isArray(g.data) ? filterMagazine(g.data, namePoint.magazine_load_46.point) : {}
        dataGetAll.line46.magazine.unload = h.type == "succees" && !Array.isArray(h.data) ? filterMagazine(h.data, namePoint.magazine_unload_46.point) : {}
        let result =  FetchAPI({method: "PATCH", host: hostJS, port: portJS, path: "magazine/amr", data:dataGetAll})
        checkResultAPI(result, "Đọc")
    }
    useEffect(()=>{
        if(setting?.jig_get_45 || setting?.jig_get_46 || setting?.jig_return_45|| setting?.jig_return_46|| setting?.magazine_load_45||setting?.magazine_unload_45|| setting?.magazine_load_46|| setting?.magazine_unload_46||
            namePoint?.jig_get_45?.point || namePoint?.jig_get_46?.point || namePoint?.jig_return_45?.point|| namePoint?.jig_return_46?.point|| namePoint?.magazine_load_45?.point||namePoint?.magazine_unload_45?.point|| namePoint?.magazine_load_46?.point|| namePoint?.magazine_unload_46?.point){
            let time = setTimeout(()=>{
                handleGetData()
            }, 1000)
            return ()=>{
                clearTimeout(time)
            }
        }
    }, [setting?.jig_get_45, setting?.jig_get_46, setting?.jig_return_45, setting?.jig_return_46, setting?.magazine_load_45, setting?.magazine_unload_45, setting?.magazine_load_46, setting?.magazine_unload_46,
        namePoint?.jig_get_45?.point, namePoint?.jig_get_46?.point, namePoint?.jig_return_45?.point, namePoint?.jig_return_46?.point, namePoint?.magazine_load_45?.point, namePoint?.magazine_unload_45?.point, namePoint?.magazine_load_46?.point, namePoint?.magazine_unload_46?.point])
  return (
    <SettingContainer>
        <TitleField>Thiết lập</TitleField>
        <Tabs
            defaultActiveKey="0"
            centered
            items={dataTabs}
            size='large'
            onChange={handleChangeTab}
        />
        <Drawerr open={openDrawer} setOpen={setOpenDrawer} arrPoint={dataChoose} onChoose={handleAddName} title={title} type='not_point'/>
        {
            tab != 'jig' ? "" :
            <SettingJig>
                <Row>
                    <Col lg={12} xl={12} xxl={12} md={24} xs={24}>
                        <TitleField style={{textAlign: "center"}}>Load Jig</TitleField>
                        <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                            <SettingJigItem data={jig.jig_get_45} fnChoose={handleChangeJig} onChoose={handleAddName} type='jig_get_45' namePoint={namePoint?.jig_get_45?.namePoint}>Line 45</SettingJigItem>
                            <SettingJigItem data={jig.jig_get_46} fnChoose={handleChangeJig} onChoose={handleAddName} type='jig_get_46' namePoint={namePoint?.jig_get_46?.namePoint}>Line 46</SettingJigItem>
                        </div>
                    </Col>
                    
                    <Col lg={12} xl={12} xxl={12} md={24} xs={24}>
                        <TitleField style={{textAlign: "center"}}>Unload Jig</TitleField>
                        <div style={{display: "flex", flexDirection: "column", gap: 20, padding: "0 20px"}}>
                            <SettingJigItem data={jig.jig_return_45} fnChoose={handleChangeJig} onChoose={handleAddName} type='jig_return_45' namePoint={namePoint?.jig_return_45?.namePoint}>Line 45</SettingJigItem>
                            <SettingJigItem data={jig.jig_return_46} fnChoose={handleChangeJig} onChoose={handleAddName} type='jig_return_46' namePoint={namePoint?.jig_return_46?.namePoint}>Line 46</SettingJigItem>
                        </div>
                    </Col>
                </Row>
            </SettingJig>
        }
        {
            tab != "magazine" ? "" : 
            <SettingMagazine>
                <Row>
                    <Col lg={12} xl={12} xxl={12} md={24} xs={24}>
                        <TitleField style={{textAlign: "center"}}>Load Magazine</TitleField>
                        <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                            <SettingJigItem data={magazine.magazine_load_45} fnChoose={handleChangeJig} onChoose={handleAddName} type='magazine_load_45' namePoint={namePoint?.magazine_load_45?.namePoint}>Line 45</SettingJigItem>
                            <SettingJigItem data={magazine.magazine_load_46} fnChoose={handleChangeJig} onChoose={handleAddName} type='magazine_load_46' namePoint={namePoint?.magazine_load_46?.namePoint}>Line 46</SettingJigItem>
                        </div>
                        
                    </Col>
                    <Col lg={12} xl={12} xxl={12} md={24} xs={24}>
                        <TitleField style={{textAlign: "center"}}>Unload Magazine</TitleField>
                        <div style={{display: "flex", flexDirection: "column", gap: 20, padding: "0 20px"}}>
                        <SettingJigItem data={magazine.magazine_unload_45} fnChoose={handleChangeJig} onChoose={handleAddName} type='magazine_unload_45' namePoint={namePoint?.magazine_unload_45?.namePoint}>Line 45</SettingJigItem>
                            <SettingJigItem data={magazine.magazine_unload_46} fnChoose={handleChangeJig} onChoose={handleAddName} type='magazine_unload_46' namePoint={namePoint?.magazine_unload_46?.namePoint}>Line 46</SettingJigItem>
                        </div>
                    </Col>
                </Row>
            </SettingMagazine>
        }
    </SettingContainer>
  )
}

export default Setting
