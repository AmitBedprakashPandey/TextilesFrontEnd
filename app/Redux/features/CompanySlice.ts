import { companyApi } from '@/lib/api/services'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface CompanyState {
    companyName: string;
    ownerName: string;

    bankName?: string;
    bankAccNo?: string;
    ifsc?: string;
    branch?: string;

    gstin?: string;
    pan?: string;


    state: string;
    city: string;
    pincode: string;

    billingStreet1: string;
    billingStreet2?: string;
    billingStreet3?: string;
    billingMobile: string;
    billingPhone?: string;
    billingEmail?: string;
}

const companyStateProps: CompanyState = {
    companyName: '',
    ownerName: '',

    bankName: '',
    bankAccNo: '',
    ifsc: '',
    branch: '',

    gstin: '',
    pan: '',


    state: '',
    city: '',
    pincode: '',

    billingStreet1: '',
    billingStreet2: '',
    billingStreet3: '',
    billingMobile: '',
    billingPhone: '',
    billingEmail: '',
}

export interface companyUpateState {
    _id: string,
    companyName: string;
    ownerName: string;

    bankName?: string;
    bankAccNo?: string;
    ifsc?: string;
    branch?: string;

    gstin?: string;
    pan?: string;


    state: string;
    city: string;
    pincode: string;

    billingStreet1: string;
    billingStreet2?: string;
    billingStreet3?: string;
    billingMobile: string;
    billingPhone?: string;
    billingEmail?: string;

}


const companyUpateState: companyUpateState = {
    _id: '',
    companyName: '',
    ownerName: '',

    bankName: '',
    bankAccNo: '',
    ifsc: '',
    branch: '',

    gstin: '',
    pan: '',


    state: '',
    city: '',
    pincode: '',

    billingStreet1: '',
    billingStreet2: '',
    billingStreet3: '',
    billingMobile: '',
    billingPhone: '',
    billingEmail: '',

}

interface props {
    company: companyUpateState[],
    currentCompany: companyUpateState | null,
    loading: boolean,
    error: string | null
    message: string | null
    openModel: boolean
}

const initialState: props = {
    company: [],
    currentCompany: null,
    loading: false,
    error: null,
    message: null,
    openModel: false
}

export const fetchCompanys = createAsyncThunk('company/fetchCompanys', async (_, { rejectWithValue }) => {
    try {
        const response = await companyApi.getAll();
        return response as companyUpateState[];
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const createCompany = createAsyncThunk('company/createCompany', async (company: CompanyState, { rejectWithValue }) => {
    try {
        const response = await companyApi.create(company);
        return response as companyUpateState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateCompany = createAsyncThunk('company/updateCompany', async (company: companyUpateState, { rejectWithValue }) => {
    try {
        const response = await companyApi.update(company._id, company);
        return response as companyUpateState;

    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteCompany = createAsyncThunk('company/deleteCompany', async (id: string, { rejectWithValue }) => {
    try {
        await companyApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateCurrentCompany = createAsyncThunk('company/updateCurrentCompany', async (company: companyUpateState, { rejectWithValue }) => {
    try {
        const response = await companyApi.update(company._id, company);
        return response as CompanyState;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)




export const counterSlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCurrentCompany: (state, action: PayloadAction<companyUpateState | null>) => {
            state.currentCompany = action.payload;
        },
        clearCurrentCompany: (state) => {
            state.currentCompany = null;
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
            .addCase(fetchCompanys.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanys.fulfilled, (state, action: PayloadAction<companyUpateState[]>) => {
                state.loading = false;
                state.company = action.payload;
            })
            .addCase(fetchCompanys.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state, action: PayloadAction<companyUpateState>) => {
                state.loading = false;
                state.company.push(action.payload);
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCompany.fulfilled, (state, action: PayloadAction<companyUpateState>) => {
                state.loading = false;
                const index = state.company.findIndex(company => company._id === action.payload._id);
                if (index !== -1) {
                    state.company[index] = action.payload;
                }
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.company = state.company.filter(company => company._id !== action.payload);
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export const { setCurrentCompany, clearCurrentCompany, setOpenModel, setCloseModel } = counterSlice.actions

export default counterSlice.reducer