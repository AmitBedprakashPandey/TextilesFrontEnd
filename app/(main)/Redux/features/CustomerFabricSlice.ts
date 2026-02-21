import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { set } from 'zod'

interface items {
    itemName: string
    pcs: string
    avgMtrs: string
    rate: string
    date: string
    totalMtrs: string
    totalAmt: string
}

interface Payment {
    date: string,
    paymentType: string,
    amount: string,
    recipt?: string,
    paidby: string
}

interface CustomerFabricState {
    fabric: items[],
    payment: Payment[],
    grandMeters: number,
    grandAmount: number,
    diffMeters: number,
    pendingAmount: number
    narration: string,
}
interface initProps {
    fabricStatus: CustomerFabricState,
    loading: boolean,
    error: string | null
    message: string | null
    openPayment: boolean, openFabric: boolean
    localStorage: CustomerFabricState | null
}

const CustomerFabricState: CustomerFabricState = {
    fabric: [],
    payment: [],
    grandMeters: 0,
    grandAmount: 0,
    diffMeters: 0,
    pendingAmount: 0,
    narration: ''
}

const initialState: initProps = {
    fabricStatus: CustomerFabricState,
    loading: false,
    error: null,
    message: null,
    openPayment: false,
    openFabric: false,
    localStorage: null
}



export const CustomerFabricSlice = createSlice({
    name: 'CustomerFabric',
    initialState,

    reducers: {
        addFabric: (state, action: PayloadAction<items>) => {
            state.fabricStatus.fabric.push(action.payload);
        },
        addPayment: (state, action: PayloadAction<Payment>) => {
            state.fabricStatus.payment.push(action.payload);
        },
        addPaymentToFabric: (state, action: PayloadAction<Payment>) => {
            state.fabricStatus.payment.push(action.payload);
        },
        clearFabric: (state) => {
            state.fabricStatus.fabric = [];
        },
        clearPayment: (state) => {
            state.fabricStatus.payment = [];
        },
        deleteFabric: (state, action: PayloadAction<number>) => {
            state.fabricStatus.fabric.splice(action.payload, 1);
        },
        deletePayment: (state, action: PayloadAction<number>) => {
            state.fabricStatus.payment.splice(action.payload, 1);
        },
        updateFabric: (state, action: PayloadAction<{ index: number, item: items }>) => {
            state.fabricStatus.fabric[action.payload.index] = action.payload.item;
        },
        updatePayment: (state, action: PayloadAction<{ index: number, item: Payment }>) => {
            state.fabricStatus.payment[action.payload.index] = action.payload.item;
        },
        addGrandTotal: (state, action: PayloadAction<{ grandMeters: number, grandAmount: number }>) => {
            state.fabricStatus.grandMeters = action.payload.grandMeters;
            state.fabricStatus.grandAmount = action.payload.grandAmount;
            console.log(action.payload);
        },
        addDiffMeters: (state, action: PayloadAction<number>) => {
            state.fabricStatus.diffMeters = action.payload;
        },
        addPendingAmount: (state, action: PayloadAction<number>) => {
            state.fabricStatus.pendingAmount = (state.fabricStatus.grandAmount - action.payload);
        },
        addNarration: (state, action: PayloadAction<string>) => {
            state.fabricStatus.narration = action.payload;
        },
        addGrandAmt: (state, action: PayloadAction<number>) => {
            state.fabricStatus.grandAmount += action.payload;
        },
        setOpenPayment: (state, action: PayloadAction<boolean>) => { state.openPayment = action.payload; },
        setOpenFabric: (state, action: PayloadAction<boolean>) => { state.openFabric = action.payload; },

        setLocalStorage: (state, action: PayloadAction<CustomerFabricState>) => {
            state.localStorage = action.payload;
        },
        clearLocalStorage: (state) => {
            state.localStorage = null;
        }

    },
    extraReducers: (builder) => {
        builder
    }
})


export const { addGrandTotal, addDiffMeters, setLocalStorage, clearLocalStorage,addPendingAmount, addNarration, addGrandAmt, deleteFabric, deletePayment, updateFabric, updatePayment, addFabric, addPayment, clearFabric, clearPayment, setOpenPayment, setOpenFabric } = CustomerFabricSlice.actions
export default CustomerFabricSlice.reducer