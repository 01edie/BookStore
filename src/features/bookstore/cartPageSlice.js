import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartPage:false,
}

const cartPageSlice = createSlice({
    name: 'cartPage',
    initialState,
    reducers:{

    }
})

export default cartPageSlice.reducer