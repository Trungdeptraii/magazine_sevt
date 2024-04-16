import { configureStore } from "@reduxjs/toolkit"
import { themeSlice } from "./slices/themeSlide"
import { amrSlice } from "./slices/amrSlice"
import { pointSlice } from "./slices/pointSlice"
import { relocationSlice } from "./slices/relocationSlice"
import { logSlice } from "./slices/logSlice"
import { controlSlice } from "./slices/controlSlice"

const rootReducer = {
    reducer: {
        theme: themeSlice.reducer,
        amr: amrSlice.reducer,
        point: pointSlice.reducer,
        relocation: relocationSlice.reducer,
        logEvent: logSlice.reducer,
        controlAMR: controlSlice.reducer
    },
}

export const stores = configureStore(rootReducer)
