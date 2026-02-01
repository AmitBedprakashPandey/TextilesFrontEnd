import { cityApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface CityState {
    cityName: string,
}

const cityState: CityState = {
    cityName: '',
}

export interface UpdateState {
    _id: string,
    cityName: string,
}

const UpdateState: UpdateState = {
    _id: '',
    cityName: '',
}

interface props {
    cityList: UpdateState[],
    currentCity: UpdateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    cityList: [],
    currentCity: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchCity = createAsyncThunk('unit/fetchCity', async (_, { rejectWithValue }) => {
    try {
        const response = await cityApi.getAll();
        return response as UpdateState[];
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createCity = createAsyncThunk('unit/createCity', async (unit: CityState, { rejectWithValue }) => {
    try {
        const response = await cityApi.create(unit);
        return response as UpdateState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateCity = createAsyncThunk('unit/updateCity', async (unit: UpdateState, { rejectWithValue }) => {
    try {
        const response = await cityApi.update(unit._id, unit);
        return response as UpdateState;

    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteCity = createAsyncThunk('unit/deleteCity', async (id: string, { rejectWithValue }) => {
    try {
        await cityApi.delete(id);
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
        SetCurrentCity: (state, action: PayloadAction<UpdateState | null>) => {
            state.currentCity = action.payload;
        },
        clearCurrentCity: (state) => {
            state.currentCity = null;
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
            .addCase(fetchCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCity.fulfilled, (state, action: PayloadAction<UpdateState[]>) => {
                state.loading = false;
                state.cityList = action.payload;
            })
            .addCase(fetchCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCity.fulfilled, (state, action: PayloadAction<UpdateState>) => {
                state.loading = false;
                state.cityList.push(action.payload);
            })
            .addCase(createCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCity.fulfilled, (state, action: PayloadAction<UpdateState>) => {
                state.loading = false;
                const index = state.cityList.findIndex(cityList => cityList._id === action.payload._id);
                if (index !== -1) {
                    state.cityList[index] = action.payload;
                }
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCity.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.cityList = state.cityList.filter(cityList => cityList._id !== action.payload);
            })
            .addCase(deleteCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { SetCurrentCity, clearCurrentCity, setOpenModel, setCloseModel } = counterSlice.actions

export default counterSlice.reducer