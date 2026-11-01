import { configureStore } from '@reduxjs/toolkit'
import ReadyMadeSlice from "@/lib/Redux/Reducers/RadymadeSlice";
import CompanySlice from "@/lib/Redux/Reducers/CompanySlice";
export const store = configureStore({
  reducer: {
    ReadyMadeItems: ReadyMadeSlice,
    CompanyItems: CompanySlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppSelector = typeof store.getState