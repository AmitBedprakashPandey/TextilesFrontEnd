import { serialNumberApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface serialNumberState {
    prefix: string,
    startNumber: number,
    currentNumber: number,
}
const serialNumberState: serialNumberState = {
    prefix: '',
    startNumber: 0,
    currentNumber: 0
}

export interface serialNumberUpateState {
    _id: string,
    prefix: string,
    startNumber: number,
    currentNumber: number,
}


const serialNumberUpateState: serialNumberUpateState = {
    _id: '',
    prefix: '',
    startNumber: 0,
    currentNumber: 0
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
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const createSerialNumber = createAsyncThunk('serialNumber/createSerialNumber', async (serialNumber: serialNumberState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.create(serialNumber);
        return response as serialNumberUpateState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateSerialNumber = createAsyncThunk('serialNumber/updateSerialNumber', async (serialNumber: serialNumberUpateState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.update(serialNumber._id, serialNumber);
        return response as serialNumberUpateState;

    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteSerialNumber = createAsyncThunk('serialNumber/deleteSerialNumber', async (id: string, { rejectWithValue }) => {
    try {
        await serialNumberApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateCurrentSerialNumber = createAsyncThunk('serialNumber/updateCurrentSerialNumber', async (serialNumber: serialNumberUpateState, { rejectWithValue }) => {
    try {
        const response = await serialNumberApi.updateCurrentNumber(serialNumber._id, serialNumber);
        return response as serialNumberState;
    } catch (error) {
        return rejectWithValue(error)
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
            })
            .addCase(deleteSerialNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { setCurrentSerialNumber, clearCurrentSerialNumber, setOpenModel, setCloseModel } = counterSlice.actions

export default counterSlice.reducer