import { createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "../../utils/api";
import { hostServerAPI, pathCancel, portServerAPI } from "../../assets/js/avaribale";
import { message } from "antd";
import { checkResultAPI } from "../../utils/clientUtil";

const initialState = {
    data: {
        run: false,
        cancel: false,
        stop: false,
        goCharge: false,
        goStandBy: false,
        time: "",
        magazine: ""
    }
}

export const controlSlice = createSlice({
    name: 'control',
    initialState,
    reducers:{
        update: (state, action)=>{
            let dataSend={}, path=""
            if(action.payload.cancel){
                path=pathCancel
                dataSend.type = "cancel"
                let result = FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path, data: dataSend})
                checkResultAPI(result)
                state.data = initialState.data
                return
            }else if(action.payload.stop == "stop"){
                dataSend.type = "pause"
                path = pathCancel
                FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path, data: dataSend})
                message.success(` Đã gửi tín hiệu Dừng thành công`)
                console.log("API Stop");
            }else if(action.payload.stop == "resume"){
                path = pathCancel
                dataSend.type = "contitue"
                FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path, data: dataSend})
                message.success(` Đã gửi tín hiệu Tiếp Tục thành công`)
                console.log("API Resumne");
            }else if(action.payload.run){
                if(action.payload.goCharge){
                    console.log("API goCharge");
                    message.success(` Đã gửi lệnh di chuyển thành công`)
                }else if(action.payload.goStandBy){
                    console.log("API goStandBy");
                    message.success(` Đã gửi lệnh di chuyển thành công`)
                }
            }
            state.data = {...initialState.data, ...action.payload}
        }
    }
})