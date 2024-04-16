import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "../../utils/api";
import { hostJS, portJS } from "../../assets/js/avaribale";

const initialState = {
    arrPoint: []
}

export const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        update: (state, action)=>{
            state.arrPoint = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(pointAPT.fulfilled, (state, action)=>{
            console.log('action', action);
            state.arrPoint = action.payload.data
        })
    }

})

export const pointAPT = createAsyncThunk('pointAPT', async()=>{
    return await FetchAPI({path: 'point', host: hostJS, port: portJS})
})