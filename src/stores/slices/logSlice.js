import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    log: 0
}

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers:{
        update: (state, action)=>{
            state.log = Math.random() * Math.random()
        }
    }
})