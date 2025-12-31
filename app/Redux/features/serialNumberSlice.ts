import { serialNumberApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface serialNumberState {
    _id: string,
    prefix: string,
    startNumber: number,
    currentNumber: number,
}

const serialNumberState: serialNumberState = {
    _id: '',
    prefix: '',
    startNumber: 0,
    currentNumber: 0
}

interface props {
    serialNumber: serialNumberState[],
    currentSerialNumber: serialNumberState | null,
    loading: boolean,
    error: string | null
    message: string | null
}

const initialState: props = {
    serialNumber: [],
    currentSerialNumber: null,
    loading: false,
    error: null,
    message: null
}

export const fetchSerialNumbers = createAsyncThunk('serialNumber/fetchSerialNumbers', async (_, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.getAll();
        return response as serialNumberState[];
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const createSerialNumber = createAsyncThunk('serialNumber/createSerialNumber', async (serialNumber: serialNumberState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.create(serialNumber);
        return response as serialNumberState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateSerialNumber = createAsyncThunk('serialNumber/updateSerialNumber',async(serialNumber:serialNumberState,{rejectWithValue})=>{
    try {
        const response = await serialNumberApi.update(serialNumber._id,serialNumber);
        return response as serialNumberState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteSerialNumber = createAsyncThunk('serialNumber/deleteSerialNumber',async(id:string,{rejectWithValue})=>{
    try {
        await serialNumberApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)



export const counterSlice = createSlice({
    name: 'serialNumber',
    initialState,
    reducers: {
        setCurrentSerialNumber: (state, action: PayloadAction<serialNumberState | null>) => {
            state.currentSerialNumber = action.payload;
        },
        clearCurrentSerialNumber: (state) => {
            state.currentSerialNumber = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSerialNumbers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSerialNumbers.fulfilled, (state, action: PayloadAction<serialNumberState[]>) => {
                state.loading = false;
                state.serialNumber = action.payload;
            })
            .addCase(fetchSerialNumbers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})



export default counterSlice.reducer