import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "../../utils/api";
import { hostJS, portJS } from "../../assets/js/avaribale";

const initialState = {
    arrRelocation: []
}

export const relocationSlice = createSlice({
    name: 'relocation',
    initialState,
    reducers: {
        update: (state, action)=>{
            state.arrRelocation = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(relocationAPI.fulfilled, (state, action)=>{
            state.arrRelocation = action.payload.data
        })
    }

})

export const relocationAPI = createAsyncThunk('relocationAPI', async()=>{
    return await FetchAPI({path: 'relocation', host: hostJS, port: portJS})
})