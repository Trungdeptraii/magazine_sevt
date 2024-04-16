import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "../../utils/api";

const initialState = {
    amr: {}
}

export const amrSlice = createSlice({
    name: 'amr',
    initialState,
    reducers: {
        update: (state, action)=>{
            state = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchAPI.fulfilled, (state, action)=>{
            state.amr = action.payload.data
        })
    }

})

export const fetchAPI = createAsyncThunk('fetchAPI', async()=>{
    return await FetchAPI({path: 'status'})
})