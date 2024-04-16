import {createGlobalStyle, styled} from 'styled-components'

import { defineFont } from './avaribale'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    svg{
        font-size: 25px;
    }
    tr{
        font-size: 16px;
    }
    tr button span{
        font-size: 16px;
        line-height: 16px
    }
    li{
        font-size: 16px;
    }
    .stepsPoint{
        row-gap: 50px;
        flex-wrap: wrap;
    }
    .ant-steps-item{
        flex-basis: 25% !important;
        max-width: 25% !important;
    }
    ${defineFont}
    .draw-header .ant-drawer-body{
        padding-right: 5px !important;
        padding-left: 5px !important;
    }
    .notiCustoms{
        background-color: red;
        border-radius: 10px;
    }
    .notiCustoms span{
        transform: translateY(10%);
    }
    .notiCustoms span svg{
        color: white;
    }
    .ant-notification-notice-message{
        font-weight: 800;
        color: white !important;
        font-size: 20px !important;
    }
    .ant-notification-notice-description{
        font-size: 18px !important;
        color: white !important;
        font-weight: 600;
    }
    .ant-drawer-body{
        padding: 10px 5px;
    }
    .ant-menu-item svg{
        font-size: 20px !important
    }
    .ant-tabs-tab-btn{
        min-width: 120px;
        font-size: 20px;
        font-weight: 600;
        text-align: center
    }
    .magazine_gripper .ant-col + div{
        flex: 1 !important;
    }
    .magazine_machine .ant-col + div {
        flex: 1 !important;
    }
    .magazine_robot .ant-col + div {
        flex: 1 !important;
    }
    label{
        font-size: 16px !important;
    }
    .noselect {
        -webkit-touch-callout: none; /* Safari */
        -webkit-user-select: none; /* Safari 3.1+ */
        -khtml-user-select: none; /* Konqueror 4.0+ */
        -moz-user-select: none; /* Firefox 2+ */
        -ms-user-select: none; /* IE 10+ */
        user-select: none; /* Standard syntax */
    }
`
export const TitleField = styled.div`
    font-size: 23px;
    font-weight: 600;
    margin: 5px 0;
`