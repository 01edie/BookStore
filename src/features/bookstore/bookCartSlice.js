import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItems:[],
    quantity:3,
    amount:0
}
const bookCart = createSlice({
    name:'bookCart',
    initialState,
    reducers:{

    }
})

export default bookCart.reducer