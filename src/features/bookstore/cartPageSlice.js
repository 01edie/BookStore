import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    cartPage:true,
    products:null,
    layout:'grid',
    sortKey:null,
    sortOrder:null,
    sortField:null,

}

const cartPageSlice = createSlice({
    name: 'cartPage',
    initialState,
    reducers:{
        switchCartPage:(state)=>{
            state.cartPage= !state.cartPage;
        },
        setProducts : (state,action)=>{
            state.products = action.payload;
        },
        setLayout : (state,action)=>{
            state.layout = action.payload;
        },
        setSortKey : (state,action)=>{
            state.sortKey = action.payload;
        },
        setSortOrder : (state,action)=>{
            state.sortOrder = action.payload;
        },
        setSortField : (state,action)=>{
            state.sortField = action.payload;
        }
    }
})
export const {setProducts, setLayout, setSortKey, setSortOrder, setSortField, switchCartPage} = cartPageSlice.actions
export default cartPageSlice.reducer