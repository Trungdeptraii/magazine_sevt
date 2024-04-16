import React, { useState } from 'react'
import { TitleField } from '../../assets/js/globalStyle'
import { Button, Space, Tabs } from 'antd'
import Jig from '../../components/Magazine/Config/Jig/Jig'
import Magazine from '../../components/Magazine/Config/Magazine/Magazine'
import PointMove from "../Point/PointMove"
import { ConfigContent } from './config_'

const dataTabs = [
    {
      key: 'jig',
      label: 'Jig',
      children: "",
    },
    {
      key: 'magazine',
      label: 'Magazinne',
      children: "",
    },
    {
      key: 'point',
      label: 'Điểm',
      children: ""
    },
]
const Config = () => {
    const handleChangeTab = (value)=>{
        setTab(value)
    }
    let [tab, setTab] = useState("jig");
  return (
    <div>
        <TitleField>Cấu hình</TitleField>
        <Tabs
            defaultActiveKey="0"
            centered
            items={dataTabs}
            size='large'
            onChange={handleChangeTab}
        />
        <ConfigContent>
          {
            tab == "jig" ? <Jig /> : ""
          }
          {
            tab == "magazine" ? <Magazine /> : ""
          }
          {
            tab == "point" ? <PointMove pageSize={6}/> : ""
          }
        </ConfigContent>
    </div>
  )
}

export default Config
