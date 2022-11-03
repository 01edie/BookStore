import React,{useEffect} from "react";
import { CartIcon } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { Menubar } from "primereact/menubar";
import { switchCartPage } from "../features/bookstore/cartPageSlice";
import {calc} from '../features/bookstore/bookCartSlice'

// import { Button } from "primereact/button";

const Navbar = () => {
  const { quantity,cartItems } = useSelector((state) => state.bookCart);
  const dispatch = useDispatch();
  const cartPageHandler =()=>{
    dispatch(switchCartPage());
  }
  useEffect(()=>{
    dispatch(calc());
  },[cartItems,dispatch])
    const end = <div className="cart-top"><div className="cart-icon"><button onClick={()=>cartPageHandler()} className="cart-button"><CartIcon></CartIcon></button></div><span className="cart-value">{quantity}</span></div>
  return (
    <nav>
      <Menubar
        start='Book Store'
        className="bg-gray-900 text-3xl text-0"
        end={end}
      />
    </nav>
  );
};

export default Navbar;
