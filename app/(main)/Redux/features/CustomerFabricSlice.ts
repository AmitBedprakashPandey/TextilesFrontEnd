import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fabricCustomerApi } from "@/lib/api/services";
import { type companyUpateState } from "@/app/(main)/Redux/features/CompanySlice";
import { type vendorUpdateState } from "@/app/(main)/Redux/features/VendorSlice";
interface IMeterGroup {
    groupNo: number;
    pattern: string | null;
    rate: number;
    meters: number[];
    totalMeters: number;
    thaans: number;
}

interface CustomerFabricState {
    company: string,
    vendor: string,
    date: string,
    grandTotalMeters: number,
    grandTotalThaans: number,
    groups: IMeterGroup[]
}

export interface CustomerFabricRetriveState {
    _id: string,
    company: companyUpateState,
    vendor: vendorUpdateState,
    date: string,
    grandTotalMeters: number,
    grandTotalThaans: number,
    groups: IMeterGroup[]
}

export interface CustomerFabricUpdateState {
    _id: string,
    company: string,
    vendor: string,
    date: string,
    grandTotalMeters: number,
    grandTotalThaans: number,
    groups: IMeterGroup[]
}

interface initProps {
    fabricStatus: CustomerFabricUpdateState[],
    loading: boolean,
    error: string | null
    message: string | null
    localStorage: CustomerFabricRetriveState | null,
    currentFabricCustomer: CustomerFabricUpdateState | null,
    openModel: boolean
}

const CustomerFabricState: CustomerFabricUpdateState = {
    _id: '',
    company: '',
    vendor: '',
    date: '',
    grandTotalMeters: 0,
    grandTotalThaans: 0,
    groups: []
}

const initialState: initProps = {
    fabricStatus: [],
    loading: false,
    error: null,
    message: null,
    localStorage: null,
    currentFabricCustomer: null
    ,openModel: false
}


export const fetchFabricCustomer = createAsyncThunk('fabricCustomer/fetchFabricCustomers', async (_, { rejectWithValue }) => {
    try {
        const response = await fabricCustomerApi.getAll();
        return response as CustomerFabricUpdateState[];
   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)


export const fetchFabricCustomerById = createAsyncThunk<CustomerFabricRetriveState,string,{rejectValue:string}>('fabricCustomer/fetchFabricCustomerById', async (id, { rejectWithValue }) => {
    try {
        const response = await fabricCustomerApi.getById(id);
        return response as CustomerFabricRetriveState;
    }catch(error:any){
return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }})




export const createFabricCustomer = createAsyncThunk<CustomerFabricUpdateState,CustomerFabricState,{rejectValue:string}>('fabricCustomer/createFabricCustomer', async (fabricCustomer, { rejectWithValue }) => {
    try {
        const response = await fabricCustomerApi.create(fabricCustomer);
        return response as CustomerFabricUpdateState;
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const updateFabricCustomer = createAsyncThunk('fabricCustomer/updateFabricCustomer', async (fabricCustomer: CustomerFabricUpdateState, { rejectWithValue }) => {
    try {
        const response = await fabricCustomerApi.update(fabricCustomer._id, fabricCustomer);
        return response as CustomerFabricUpdateState;

   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)

export const deleteFabricCustomer = createAsyncThunk('fabricCustomer/deleteFabricCustomer', async (id: string, { rejectWithValue }) => {
    try {
        await fabricCustomerApi.delete(id);
        return id;
   } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong")
    }
}
)



export const CustomerFabricSlice = createSlice({
    name: 'CustomerFabric',
    initialState,
    reducers: {
        setCurrentFabricCustomer: (state, action: PayloadAction<CustomerFabricUpdateState | null>) => {
            state.currentFabricCustomer = action.payload;
        },
        clearCurrentFabricCustomer: (state) => {
            state.currentFabricCustomer = null;
        },      
         clearNotification: (state) => {
            state.message = null;
            state.error = null;
        },
        setOpenModel: (state, action: PayloadAction<boolean>) => {
            state.openModel = action.payload;
        },
        setCloseModel: (state) => {
            state.openModel = false;
        },
        setLocalStorage: (state, action: PayloadAction<CustomerFabricRetriveState>) => {
            state.localStorage = action.payload as CustomerFabricRetriveState;
        },
        clearLocalStorage: (state) => {
            state.localStorage = null;
        },        
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFabricCustomer.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchFabricCustomer.fulfilled, (state, action: PayloadAction<CustomerFabricUpdateState[]>) => {
            state.loading = false;
            state.fabricStatus = action.payload;
        })
        .addCase(fetchFabricCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(fetchFabricCustomerById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchFabricCustomerById.fulfilled,(state,action: PayloadAction<CustomerFabricRetriveState>)=>{
            state.loading = false;
            state.localStorage = action.payload;
        })
        .addCase(fetchFabricCustomerById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(createFabricCustomer.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createFabricCustomer.fulfilled, (state, action: PayloadAction<CustomerFabricUpdateState>) => {
            state.loading = false;
            state.message = "Created Successfully";
            state.fabricStatus.push(action.payload);    
        })
        .addCase(createFabricCustomer.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })  
        .addCase(updateFabricCustomer.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateFabricCustomer.fulfilled,(state,action: PayloadAction<CustomerFabricUpdateState>)=>{
            state.loading = false;
            const index = state.fabricStatus.findIndex(fabricCustomer => fabricCustomer._id === action.payload._id);
            if (index !== -1) {
                state.fabricStatus[index] = action.payload;
            }
            state.message = "Updated Successfully";
        })
        .addCase(updateFabricCustomer.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(deleteFabricCustomer.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteFabricCustomer.fulfilled,(state,action: PayloadAction<string>)=>{
            state.loading = false;
            state.fabricStatus = state.fabricStatus.filter(fabricCustomer => fabricCustomer._id !== action.payload);
            state.message = "Deleted Successfully";
        })
        .addCase(deleteFabricCustomer.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export const { setCurrentFabricCustomer, clearCurrentFabricCustomer, clearNotification, setOpenModel, setCloseModel, setLocalStorage, clearLocalStorage } = CustomerFabricSlice.actions

export default CustomerFabricSlice.reducer