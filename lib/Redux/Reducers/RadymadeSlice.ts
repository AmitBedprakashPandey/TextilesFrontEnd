import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readyMadeApi } from "@/lib/api/services";
import { API_ENDPOINTS } from "@/lib/api/endpoint";

export interface ReadyMade {
    _id: string;
    itemName: string;
    rate?: number;
    avg?: number;
    popline?: number;
    border?: number;
}

export interface CreateReadyMade {
    itemName: string;
    rate?: number;
    avg?: number;
    popline?: number;
    border?: number;
}

interface ReadyMadeState {
    items: ReadyMade[];
    selectedItem: ReadyMade;
    loading: boolean;
    error: string | null;
    message: string | null;
    openfrom: boolean,
    openConfirm: boolean
}

const initialState: ReadyMadeState = {
    items: [],
    selectedItem: {} as ReadyMade,
    loading: false,
    error: null,
    message: null,
    openConfirm: false,
    openfrom: false
};

// GET ALL
export const getReadyMades = createAsyncThunk<ReadyMade[], void, { rejectValue: string }>("readymade/getReadyMades", async (_, { rejectWithValue }) => {
    try {
        const response = await readyMadeApi.getAll();
        return response as ReadyMade[];
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
}
);

// GET BY ID
export const getReadyMadeById = createAsyncThunk<ReadyMade, string, { rejectValue: string }>(
    "readymade/getReadyMadeById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await readyMadeApi.getById(id);
            return response as ReadyMade;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Something went wrong");
        }
    }
);

// CREATE
export const createReadyMade = createAsyncThunk<ReadyMade, CreateReadyMade, { rejectValue: string }>(
    "readymade/createReadyMade",
    async (data, { rejectWithValue }) => {
        try {
            const response = await readyMadeApi.create(data);
            return response as ReadyMade;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Something went wrong"
            );
        }
    }
);

// UPDATE
export const updateReadyMade = createAsyncThunk<ReadyMade, ReadyMade, { rejectValue: string }>(
    "readymade/updateReadyMade",
    async (
        data,
        { rejectWithValue }
    ) => {
        try {
            const response = await readyMadeApi.update(data._id, data);
            return response as ReadyMade;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Something went wrong"
            );
        }
    }
);

// DELETE
export const deleteReadyMade = createAsyncThunk<string, string, { rejectValue: string }>(
    "readymade/deleteReadyMade",
    async (id, { rejectWithValue }) => {
        try {
            const response = await readyMadeApi.delete(id);
            return id;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Something went wrong"
            );
        }
    }
);

const readymadeSlice = createSlice({
    name: "readymade",
    initialState,
    reducers: {
        setSelectedItem: (state, action: PayloadAction<ReadyMade>) => {
            state.selectedItem = action.payload;
        },

        clearSelectedItem: (state) => {
            state.selectedItem = {} as ReadyMade;
        },

        clearError: (state) => {
            state.error = null;
        },
        setOpenFrom: (state, action: PayloadAction<boolean>) => {
            state.openfrom = action.payload;
        },
        setOpenConfirm: (state, action: PayloadAction<boolean>) => {
            state.openConfirm = action.payload;
        },
    },

    extraReducers: (builder) => {
        // GET ALL
        builder
            .addCase(getReadyMades.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReadyMades.fulfilled, (state, action: PayloadAction<ReadyMade[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getReadyMades.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // GET BY ID
        builder
            .addCase(getReadyMadeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getReadyMadeById.fulfilled,
                (state, action: PayloadAction<ReadyMade>) => {
                    state.loading = false;
                    state.selectedItem = action.payload;
                }
            )
            .addCase(getReadyMadeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // CREATE
        builder
            .addCase(createReadyMade.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReadyMade.fulfilled,(state, action: PayloadAction<ReadyMade>) => {
                    state.loading = false;
                    state.items.push(action.payload);
                    state.message = "Created Successfully"
            })
            .addCase(createReadyMade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // UPDATE
        builder
            .addCase(updateReadyMade.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReadyMade.fulfilled,(state, action: PayloadAction<ReadyMade>) => {
                    state.loading = false;
                    const index = state.items.findIndex(
                        (item) => item._id === action.payload._id
                    );

                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }

                    if (state.selectedItem?._id === action.payload._id) {
                        state.selectedItem = action.payload;
                    }
                    state.message = "Updated Successfully"
                }
            )
            .addCase(updateReadyMade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // DELETE
        builder
            .addCase(deleteReadyMade.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReadyMade.fulfilled,(state, action: PayloadAction<string>) => {
                    state.loading = false;

                    state.items = state.items.filter(
                        (item) => item._id !== action.payload
                    );

                    if (state.selectedItem?._id === action.payload) {
                        state.selectedItem = {} as ReadyMade;
                    }
                    state.message = "Deleted Successfully"
                }
            )
            .addCase(deleteReadyMade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedItem, clearError, setSelectedItem,setOpenConfirm,setOpenFrom } = readymadeSlice.actions;

export default readymadeSlice.reducer;