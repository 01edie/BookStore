import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
};
const bookCart = createSlice({
  name: "bookCart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      
      let alreadyExist = false;
      const newCartItems=state.cartItems.map((item)=>{
        if(item.id===payload.id){
          alreadyExist=true;
          return {...item,quantity:(item.quantity+1)}
        }else{
          return item;
        }
      })
      
      if(alreadyExist){
        state.cartItems=newCartItems;
      }else{
        const newObj = {
          id: payload.id,
          title: payload.name,
          price: payload.price,
          img: payload.image,
          quantity: 1,
        };
        state.cartItems.push(newObj);

      }
      console.log("cart-items: ", state.cartItems);
    },
    removeItem: (state, action) => {
      console.log(2);
      console.log(action);
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increase: (state, action) => {
      let cartItem = state.cartItems.find((item) => item.id === action.payload);
      cartItem.quantity = cartItem.quantity + 1;
      console.log(cartItem);
      console.log(action);
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity - 1;
    },
    clearCart: (state, action) => {
      
      state.cartItems = [];
      
    },
    calc: (state) => {
      let quantity = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.quantity = quantity;
      state.total = total.toFixed(2);
    },
  },
});
export const { addItem, removeItem, increase, decrease, clearCart, calc } =
  bookCart.actions;
export default bookCart.reducer;
