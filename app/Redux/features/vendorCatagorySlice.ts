import { vendorCategoryApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface vendorCatagoryState {
    name: string,
}

const vendorCatagoryState: vendorCatagoryState = {
    name: '',
}

export interface vendorCatagoryUpdateState {
    _id: string,
  name:string
}

interface props {
    vendorCatagory: vendorCatagoryUpdateState[],
    currentvendorCatagory: vendorCatagoryUpdateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    vendorCatagory: [],
    currentvendorCatagory: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchvendorCatagory = createAsyncThunk('fetchVendorCatagory', async (_, { rejectWithValue }) => {
    try {
        const response = await vendorCategoryApi.getAll();
        return response as vendorCatagoryUpdateState[];
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const createvendorCatagory = createAsyncThunk('createVendorCatagory', async (vendorCatagory: vendorCatagoryState, { rejectWithValue }) => {
    try {
        const response = await vendorCategoryApi.create(vendorCatagory);
        return response as vendorCatagoryUpdateState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updatevendorCatagory = createAsyncThunk('updateVendorCatagory', async (vendorCatagory: vendorCatagoryUpdateState, { rejectWithValue }) => {
    try {
        const response = await vendorCategoryApi.update(vendorCatagory._id, vendorCatagory);
        return response as vendorCatagoryUpdateState;

    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deletevendorCatagory = createAsyncThunk('deleteVendorCatagory', async (id: string, { rejectWithValue }) => {
    try {
        await vendorCategoryApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const counterSlice = createSlice({
    name: 'vendorCategory',
    initialState,
    reducers: {
        SetCurrentvendorCatagory: (state, action: PayloadAction<vendorCatagoryUpdateState | null>) => {
            state.currentvendorCatagory = action.payload;
        },
        clearCurrentvendorCatagory: (state) => {
            state.currentvendorCatagory = null;
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
            .addCase(fetchvendorCatagory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchvendorCatagory.fulfilled, (state, action: PayloadAction<vendorCatagoryUpdateState[]>) => {
                state.loading = false;
                state.vendorCatagory = action.payload;
            })
            .addCase(fetchvendorCatagory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createvendorCatagory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createvendorCatagory.fulfilled, (state, action: PayloadAction<vendorCatagoryUpdateState>) => {
                state.loading = false;
                state.vendorCatagory.push(action.payload);
            })
            .addCase(createvendorCatagory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updatevendorCatagory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatevendorCatagory.fulfilled, (state, action: PayloadAction<vendorCatagoryUpdateState>) => {
                state.loading = false;
                const index = state.vendorCatagory.findIndex(vendorCatagory => vendorCatagory._id === action.payload._id);
                if (index !== -1) {
                    state.vendorCatagory[index] = action.payload;
                }
            })
            .addCase(updatevendorCatagory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deletevendorCatagory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletevendorCatagory.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.vendorCatagory = state.vendorCatagory.filter(vendorCatagory => vendorCatagory._id !== action.payload);
            })
            .addCase(deletevendorCatagory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { SetCurrentvendorCatagory, clearCurrentvendorCatagory, setOpenModel, setCloseModel } = counterSlice.actions

export default counterSlice.reducer