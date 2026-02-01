import { areaApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface AreaState {
    areaName: string,
}

const areaState: AreaState = {
    areaName: '',
}

export interface UpdateState {
    _id: string,
    areaName: string,
}

const UpdateState: UpdateState = {
    _id: '',
    areaName: '',
}

interface props {
    areaList: UpdateState[],
    currentArea: UpdateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    areaList: [],
    currentArea: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchArea = createAsyncThunk('unit/fetchArea', async (_, { rejectWithValue }) => {
    try {
        const response = await areaApi.getAll();
        return response as UpdateState[];
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const createArea = createAsyncThunk('unit/createArea', async (unit: AreaState, { rejectWithValue }) => {
    try {
        const response = await areaApi.create(unit);
        return response as UpdateState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateArea = createAsyncThunk('unit/updateArea', async (unit: UpdateState, { rejectWithValue }) => {
    try {
        const response = await areaApi.update(unit._id, unit);
        return response as UpdateState;

    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteArea = createAsyncThunk('unit/deleteArea', async (id: string, { rejectWithValue }) => {
    try {
        await areaApi.delete(id);
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
        SetCurrentArea: (state, action: PayloadAction<UpdateState | null>) => {
            state.currentArea = action.payload;
        },
        clearCurrentArea: (state) => {
            state.currentArea = null;
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
            .addCase(fetchArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArea.fulfilled, (state, action: PayloadAction<UpdateState[]>) => {
                state.loading = false;
                state.areaList = action.payload;
            })
            .addCase(fetchArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createArea.fulfilled, (state, action: PayloadAction<UpdateState>) => {
                state.loading = false;
                state.areaList.push(action.payload);
            })
            .addCase(createArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateArea.fulfilled, (state, action: PayloadAction<UpdateState>) => {
                state.loading = false;
                const index = state.areaList.findIndex(areaList => areaList._id === action.payload._id);
                if (index !== -1) {
                    state.areaList[index] = action.payload;
                }
            })
            .addCase(updateArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteArea.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.areaList = state.areaList.filter(areaList => areaList._id !== action.payload);
            })
            .addCase(deleteArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { SetCurrentArea, clearCurrentArea, setOpenModel, setCloseModel } = counterSlice.actions

export default counterSlice.reducer