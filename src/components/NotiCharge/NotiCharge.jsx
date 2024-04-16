import React from 'react'
import { ContainerNoti, DesNoti, DivContainerNoti, DivProgress, DotAnimate, IconNoti, TitleNoti, TitleTextNoti, conicColors } from './noti_'
import {RedditOutlined} from "@ant-design/icons"
import {Progress } from "antd"

const NotiCharge = ({percent}) => {
    
  return (
    <DivContainerNoti>
        <ContainerNoti>
            <TitleNoti>
                <RedditOutlined />
                <TitleTextNoti>Thông báo</TitleTextNoti>
            </TitleNoti>
            <DesNoti>AMR đang sạc pin</DesNoti>
            <DotAnimate>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </DotAnimate>
            <DivProgress>
                <Progress strokeColor={conicColors} percent={percent ? (percent * 100).toFixed(0): 0}/>
            </DivProgress>
        </ContainerNoti>
    </DivContainerNoti>
  )
}

export default NotiCharge
