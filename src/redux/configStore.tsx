import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducer/productReducer'
import userReducer from './reducer/userReducer'
export const store = configureStore({
    reducer: {
        productReducer,
        userReducer
    },
})
export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch