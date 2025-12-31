import { configureStore } from "@reduxjs/toolkit";
import serialNumberReducer from "./features/serialNumberSlice";
export const store = configureStore({
    reducer:{
        serialNumber:serialNumberReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
