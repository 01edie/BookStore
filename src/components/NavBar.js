import React from "react";
import { CartIcon } from "../icons";
import { useSelector } from "react-redux";
import { Menubar } from "primereact/menubar";
// import { Button } from "primereact/button";

const Navbar = () => {
  const { quantity } = useSelector((state) => state.bookCart);
    const end = <div className="cart-top"><div className="cart-icon"><button className="cart-button"><CartIcon></CartIcon></button></div><span className="cart-value">{quantity}</span></div>
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
