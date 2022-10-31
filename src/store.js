import { configureStore } from "@reduxjs/toolkit";
import cartPageReducer from './features/bookstore/cartPageSlice'
import bookCartReducer from './features/bookstore/bookCartSlice'
export const store = configureStore({
    name: 'store',
    reducer:{
        cartPage:cartPageReducer,
        bookCart: bookCartReducer,
    }
})