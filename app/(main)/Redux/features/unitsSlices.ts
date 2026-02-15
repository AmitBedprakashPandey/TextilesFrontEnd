import { unitApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface unitState {
    unitName: string,
    unitShort: string,
}

const unitState: unitState = {
    unitName: '',
    unitShort: ""
}

export interface unitUpdateState {
    _id: string,
    unitName: string,
    unitShort: string,
}

const unitUpdateState: unitUpdateState = {
    _id: '',
    unitName: '',
    unitShort: ""
}

interface props {
    unit: unitUpdateState[],
    currentUnit: unitUpdateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    unit: [],
    currentUnit: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchUnit = createAsyncThunk('unit/fetchUnit', async (_, { rejectWithValue }) => {
    try {
        const response = await unitApi.getAll();
        return response as unitUpdateState[];
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const createUnit = createAsyncThunk('unit/createUnit', async (unit: unitState, { rejectWithValue }) => {
    try {
        const response = await unitApi.create(unit);
        return response as unitUpdateState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateUnit = createAsyncThunk('unit/updateUnit', async (unit: unitUpdateState, { rejectWithValue }) => {
    try {
        const response = await unitApi.update(unit._id, unit);
        return response as unitUpdateState;

    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteUnit = createAsyncThunk('unit/deleteUnit', async (id: string, { rejectWithValue }) => {
    try {
        await unitApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)





export const counterSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        SetCurrentUnit: (state, action: PayloadAction<unitUpdateState | null>) => {
            state.currentUnit = action.payload;
        },
        clearCurrentUnit: (state) => {
            state.currentUnit = null;
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
            .addCase(fetchUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUnit.fulfilled, (state, action: PayloadAction<unitUpdateState[]>) => {
                state.loading = false;
                state.unit = action.payload;
            })
            .addCase(fetchUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUnit.fulfilled, (state, action: PayloadAction<unitUpdateState>) => {
                state.loading = false;
                state.unit.push(action.payload);
            })
            .addCase(createUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUnit.fulfilled, (state, action: PayloadAction<unitUpdateState>) => {
                state.loading = false;
                const index = state.unit.findIndex(unit => unit._id === action.payload._id);
                if (index !== -1) {
                    state.unit[index] = action.payload;
                }
            })
            .addCase(updateUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUnit.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.unit = state.unit.filter(unit => unit._id !== action.payload);
            })
            .addCase(deleteUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { SetCurrentUnit, clearCurrentUnit, setOpenModel, setCloseModel } = counterSlice.actions

export default counterSlice.reducer