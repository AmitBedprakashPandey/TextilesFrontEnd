import { vendorApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'


export interface vendorState {
    vendorCategory: string,

    vendorname: string,
    ownername?: string,

    gstin?: string,
    pan?: string,

    phone?: string,
    mobile: string,
    email?: string,

    address: string,
    address1?: string,

    state: string,
    city: string,
    pincode: string,

    bankname?: string,
    accountno?: string,
    ifsc?: string,
    branch?: string,

    
}

const vendorProps: vendorState = {
    accountno: '',
    address: '',
    address1: '',
    bankname: '',
    city: '',
    vendorname: '',
    email: '',
    gstin: '',
    ifsc: '',
    branch: '',
    mobile: '',
    ownername: '',
    pan: '',
    phone: '',
    pincode: '',
    state: '',
    vendorCategory: "",
}

export interface vendorUpdateState {
    _id: string,
     vendorCategory:string,

    vendorname: string,
    ownername?: string,

    gstin?: string,
    pan?: string,

    phone?: string,
    mobile: string,
    email?: string,

    address: string,
    address1?: string,

    state: string,
    city: string,
    pincode: string,

    bankname?: string,
    accountno?: string,
    ifsc?: string,
    branch?: string,


}

const vendorUpdateProps: vendorUpdateState = {
    _id: '',
    accountno: '',
    address: '',
    address1: '',
    bankname: '',
    city: '',
    vendorname: '',
    email: '',
    gstin: '',
    ifsc: '',
    branch: '',
    mobile: '',
    ownername: '',
    pan: '',
    phone: '',
    pincode: '',
    state: '',
    vendorCategory: "",

}

interface props {
    vendorList: vendorUpdateState[],
    currentVendor: vendorUpdateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    vendorList: [],
    currentVendor: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchVendor = createAsyncThunk('vendor/fetchVendor', async (_, { rejectWithValue }) => {
    try {
        const response = await vendorApi.getAll();
        return response as vendorUpdateState[];
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
})

export const createVendor = createAsyncThunk('vendor/createVendor', async (vendor: vendorState, { rejectWithValue }) => {
    try {
        const response = await vendorApi.create(vendor);
        return response as vendorUpdateState;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const updateVendor = createAsyncThunk('vendor/updateVendor', async (vendor: vendorUpdateState, { rejectWithValue }) => {
    try {
        const response = await vendorApi.update(vendor._id, vendor);
        return response as vendorUpdateState;

    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const deleteVendor = createAsyncThunk('vendor/deleteVendor', async (id: string, { rejectWithValue }) => {
    try {
        await vendorApi.delete(id);
        return id;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const counterSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        SetCurrentVendor: (state, action: PayloadAction<vendorUpdateState | null>) => {
            state.currentVendor = action.payload;
        },
        clearCurrentVendor: (state) => {
            state.currentVendor = null;
        },
        setOpenModel: (state, action: PayloadAction<boolean>) => {
            state.openModel = action.payload;
        },
        setCloseModel: (state) => {
            state.openModel = false;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        }



    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVendor.fulfilled, (state, action: PayloadAction<vendorUpdateState[]>) => {
                state.loading = false;
                state.vendorList = action.payload;
            })
            .addCase(fetchVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVendor.fulfilled, (state, action: PayloadAction<vendorUpdateState>) => {
                state.loading = false;
                state.vendorList.push(action.payload);
                state.message = "Created Successfully";
            })
            .addCase(createVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVendor.fulfilled, (state, action: PayloadAction<vendorUpdateState>) => {
                state.loading = false;
                const index = state.vendorList.findIndex(vendorList => vendorList._id === action.payload._id);
                if (index !== -1) {
                    state.vendorList[index] = action.payload;
                }
                state.message = "Updated Successfully";
            })
            .addCase(updateVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVendor.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.vendorList = state.vendorList.filter(vendorList => vendorList._id !== action.payload);
                state.message = "Deleted Successfully";
            })
            .addCase(deleteVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { SetCurrentVendor, clearCurrentVendor, setOpenModel, setCloseModel, clearMessage, clearError } = counterSlice.actions

export default counterSlice.reducer