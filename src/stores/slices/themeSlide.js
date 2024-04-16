import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        light: (state, action)=>{
            state.theme = 'light'
        },
        dark: (state, action)=>{
            state.theme = 'dark'
        }
    }
})