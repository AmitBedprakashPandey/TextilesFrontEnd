import { configureStore } from "@reduxjs/toolkit";
import serialNumberReducer from "./features/serialNumberSlice";
import unitSlice from "./features/unitsSlices";
import areaSlice from "./features/AreaSlice";
import citySlice from "./features/CitySlice";
import vendorCategorySlice from "./features/vendorCatagorySlice";
import vendorSlice from "./features/VendorSlice";
import CompanySlice from "./features/CompanySlice";
import TailorFabricSlice from "./features/TailorFabricSlice";


export const store = configureStore({
    reducer: {
        serialNumber: serialNumberReducer,
        unitSlice: unitSlice,
        Area: areaSlice,
        City: citySlice,
        vendor: vendorSlice,
        vendorCategory: vendorCategorySlice,
        company : CompanySlice,
TailorFabric : TailorFabricSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
