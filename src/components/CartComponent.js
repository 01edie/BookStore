import React, { useEffect } from 'react'
import CartContainer from './CartContainer'
import { useDispatch, useSelector } from 'react-redux'
import { calc } from '../features/bookstore/bookCartSlice'


const CartComponent = () => {
    const {cartItems} = useSelector((store)=>store.bookCart);
    const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calc());
  },[cartItems,dispatch]);
  return (
    <div className='main'>
     
      <CartContainer></CartContainer>
    </div>
  )
}

export default CartComponent
