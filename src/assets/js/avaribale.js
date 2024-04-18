import { css } from "styled-components"

const env = import.meta.env;

export const Robot = env.VITE_ROBOT

export const hostJS = env.VITE_HOST_JSONSERVER
export const portJS = env.VITE_PORT_JSONSERVER

export const hostServerAPI = env.VITE_SERVER_API
export const portServerAPI = env.VITE_PORT_SERVER

export const pathRelocation = env.VITE_PATH_RELOCATION
export const pathNavigation = env.VITE_PATH_NAVIGATION
export const pathConfirmLoc = env.VITE_PATH_CONFIRMLOC
export const pathCancel = env.VITE_PATH_CANCEL
export const pathStopResume = env.VITE_PATH_STOP_RESUME
export const pathMonitor = env.VITE_PATH_MONITOR
export const pathSetIO = env.VITE_PATH_IO

export const pathPointJS = env.VITE_PATH_POINTAPI
export const pathRelocationJS = env.VITE_PATH_RELOCATIONAPI
export const pathLogJS = env.VITE_PATH_LOG
export const pathWareHouse = env.VITE_PATH_WARE_HOUSE

export const pageSizePoint = 7
export const pageSizeRelocation = 5

export const isLogStatus = "disable"


import logos from "./../images/logo.png"
import esaGif from "./../images/esaGif.gif"
import mew from "../images/mew.gif"

export const mews = mew
export const logo = logos
export const gifEsa = esaGif

export const widthSideBar = env.VITE_WIDTHSIDEBAR




export const defineFont = css`
    @font-face {
        font-family: "Roboto-Light";
        src: url('./../fonts/roboto/Roboto-Light.ttf') format("truetype");
    }
    @font-face {
        font-family: "Roboto-Regular";
        src: url('./../fonts/roboto/Roboto-Regular.ttf') format("truetype");
    }
    @font-face {
        font-family: "Roboto-Medium";
        src: url('./../fonts/roboto/Roboto-Medium.ttf') format("truetype");
    }
    @font-face {
        font-family: "Roboto-Bold";
        src: url('./../fonts/roboto/Roboto-Bold.ttf') format("truetype");
    }
`
export const layoutStyle= {
    heightHeader: `50px`,
    heightFooter: `0px`
}
export const speedMax = 1.2
