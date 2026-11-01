import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { companyApi } from "@/lib/api/services";

function getErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        return data?.message ?? error.message ?? fallback;
    }
    return error instanceof Error ? error.message : fallback;
}

export interface Company {
    _id: string;
    type?: string;
    companyName: string;
    ownerName: string;
    billingStreet1: string;
    billingStreet2: string;
    state: string;
    city: string;
    pincode: string;
    email: string;
    gstin: string;
    phone: string;
    mobile: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CompanyPayload {
    type: string;
    companyName: string;
    ownerName: string;
    billingStreet1: string;
    billingStreet2: string;
    state: string;
    city: string;
    pincode: string;
    email: string;
    gstin: string;
    phone: string;
    mobile: string;
}

export interface UpdateCompanyPayload extends CompanyPayload {
    _id: string;
}

interface CompanyState {
    items: Company[];
    selectedItem: Company | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    openfrom: boolean;
    openConfirm: boolean;
}

const initialState: CompanyState = {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
    message: null,
    openConfirm: false,
    openfrom: false,
};

// GET ALL
export const getCompanies = createAsyncThunk<Company[], void, { rejectValue: string }>(
    "company/getCompanies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await companyApi.getAll();
            return response as Company[];
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Something went wrong"));
        }
    }
);

// GET BY ID
export const getCompanyById = createAsyncThunk<Company, string, { rejectValue: string }>(
    "company/getCompanyById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await companyApi.getById(id);
            return response as Company;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Something went wrong"));
        }
    }
);

// CREATE
export const createCompany = createAsyncThunk<Company, CompanyPayload, { rejectValue: string }>(
    "company/createCompany",
    async (data, { rejectWithValue }) => {
        try {
            const response = await companyApi.create(data);
            return response as Company;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Something went wrong"));
        }
    }
);

// UPDATE
export const updateCompany = createAsyncThunk<Company, UpdateCompanyPayload, { rejectValue: string }>(
    "company/updateCompany",
    async (data, { rejectWithValue }) => {
        try {
            const { _id, ...payload } = data;
            const response = await companyApi.update(_id, payload);
            return response as Company;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Something went wrong"));
        }
    }
);

// DELETE
export const deleteCompany = createAsyncThunk<string, string, { rejectValue: string }>(
    "company/deleteCompany",
    async (id, { rejectWithValue }) => {
        try {
            await companyApi.delete(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Something went wrong"));
        }
    }
);

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setSelectedItem: (state, action: PayloadAction<Company | null>) => {
            state.selectedItem = action.payload;
        },

        clearSelectedItem: (state) => {
            state.selectedItem = null;
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
            .addCase(getCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompanies.fulfilled, (state, action: PayloadAction<Company[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // GET BY ID
        builder
            .addCase(getCompanyById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompanyById.fulfilled, (state, action: PayloadAction<Company>) => {
                state.loading = false;
                state.selectedItem = action.payload;
            })
            .addCase(getCompanyById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // CREATE
        builder
            .addCase(createCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state, action: PayloadAction<Company>) => {
                state.loading = false;
                state.items.push(action.payload);
                state.message = "Created Successfully";
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // UPDATE
        builder
            .addCase(updateCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCompany.fulfilled, (state, action: PayloadAction<Company>) => {
                state.loading = false;
                const index = state.items.findIndex((item) => item._id === action.payload._id);

                if (index !== -1) {
                    state.items[index] = action.payload;
                }

                if (state.selectedItem?._id === action.payload._id) {
                    state.selectedItem = action.payload;
                }
                state.message = "Updated Successfully";
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // DELETE
        builder
            .addCase(deleteCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.items = state.items.filter((item) => item._id !== action.payload);

                if (state.selectedItem?._id === action.payload) {
                    state.selectedItem = null;
                }
                state.message = "Deleted Successfully";
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearSelectedItem,
    clearError,
    setSelectedItem,
    setOpenConfirm,
    setOpenFrom,
} = companySlice.actions;

export default companySlice.reducer;
