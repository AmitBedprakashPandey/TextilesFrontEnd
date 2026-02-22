import { serialNumberApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { clear, log } from 'console'

export interface serialNumberState {
    prefix: string,
    startNumber: string,
    currentNumber: string,
    companyid: string
}
const serialNumberState: serialNumberState = {
    prefix: '',
    startNumber: '' ,
    currentNumber: '',
    companyid: ''
}

export interface serialNumberUpateState {
    _id: string,
    prefix: string,
    startNumber: string,
    currentNumber: string   ,
    companyid: string
}


const serialNumberUpateState: serialNumberUpateState = {
    _id: '',
    prefix: '',
    startNumber: '',
    currentNumber: '',
    companyid: ''
}

interface props {
    serialNumber: serialNumberUpateState[],
    currentSerialNumber: serialNumberUpateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    serialNumber: [],
    currentSerialNumber: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchSerialNumbers = createAsyncThunk('serialNumber/fetchSerialNumbers', async (_, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.getAll();
        return response as serialNumberUpateState[];
   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const createSerialNumber = createAsyncThunk('serialNumber/createSerialNumber', async (serialNumber: serialNumberState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.create(serialNumber);
        return response as serialNumberUpateState;
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const updateSerialNumber = createAsyncThunk('serialNumber/updateSerialNumber', async (serialNumber: serialNumberUpateState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.update(serialNumber._id, serialNumber);
        return response as serialNumberUpateState;

   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const deleteSerialNumber = createAsyncThunk('serialNumber/deleteSerialNumber', async (id: string, { rejectWithValue }) => {
    try {
        await serialNumberApi.delete(id);
        return id;
   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const updateCurrentSerialNumber = createAsyncThunk('serialNumber/updateCurrentSerialNumber', async (serialNumber: serialNumberUpateState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.updateCurrentNumber(serialNumber._id, serialNumber);
        return response as serialNumberState;
   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)




export const counterSlice = createSlice({
    name: 'serialNumber',
    initialState,
    reducers: {
        setCurrentSerialNumber: (state, action: PayloadAction<serialNumberUpateState | null>) => {
            state.currentSerialNumber = action.payload;
        },
        clearCurrentSerialNumber: (state) => {
            state.currentSerialNumber = null;
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
            .addCase(fetchSerialNumbers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSerialNumbers.fulfilled, (state, action: PayloadAction<serialNumberUpateState[]>) => {
                state.loading = false;
                state.serialNumber = action.payload;
            })
            .addCase(fetchSerialNumbers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createSerialNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSerialNumber.fulfilled, (state, action: PayloadAction<serialNumberUpateState>) => {
                state.loading = false;
                state.message = "Created Successfully";
                state.serialNumber.push(action.payload);
            })
            .addCase(createSerialNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateSerialNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSerialNumber.fulfilled, (state, action: PayloadAction<serialNumberUpateState>) => {
                state.loading = false;
                const index = state.serialNumber.findIndex(serialNumber => serialNumber._id === action.payload._id);
                if (index !== -1) {
                    state.serialNumber[index] = action.payload;
                }
                state.message = "Updated Successfully";
            })
            .addCase(updateSerialNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteSerialNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSerialNumber.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.serialNumber = state.serialNumber.filter(serialNumber => serialNumber._id !== action.payload);
                state.message = "Deleted Successfully";
            })
            .addCase(deleteSerialNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { setCurrentSerialNumber, clearCurrentSerialNumber, setOpenModel, setCloseModel , clearMessage, clearError} = counterSlice.actions

export default counterSlice.reducer