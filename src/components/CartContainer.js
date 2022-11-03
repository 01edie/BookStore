import React, { useRef } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/bookstore/bookCartSlice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { switchCartPage } from "../features/bookstore/cartPageSlice";


const CartContainer = () => {
  const { cartItems, quantity, total } = useSelector((state) => state.bookCart);
  const dispatch = useDispatch();
  const toastCart = useRef(null);

  const accept = () => {
    dispatch(clearCart());
    const timeOut = setTimeout(() => {
      toastCart.current.show({
        severity: "success",
        summary: "Confirmed",
        detail: "Cart Cleared",
        life: 2000,
      });
      return clearTimeout(timeOut);
    }, 100);
  };
  

  

  const reject = () => {
    toastCart.current.show({
      severity: "info",
      summary: "Cancelled",
      detail: "Cart remained!",
      life: 2000,
    });
  };

  const removeToast =()=>{
    toastCart.current.show({
      severity: "info",
      summary: "Success",
      detail: "Item Removed!",
      life: 2000,
    });
    console.log('rm');
  }
  const clearCartHandler = () => {
    confirmDialog({
      message: "Do you want to clear the cart?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };


  // ...

  if (quantity < 1) {
    return (
      <div>
        <Button label="Back to Store" icon='pi pi-book' onClick={()=>dispatch(switchCartPage())} className="store-btn text-sm md:text-base"></Button>
        <Toast ref={toastCart} />
        <section className="cart">
          <h2 className="flex align-items-center justify-content-center gap-2">
            Your Bag{" "}
            <i className="pi pi-shopping-bag" style={{ fontSize: "2rem" }}></i>
          </h2>
          <h4 className="empty-cart">is currently empty</h4>
        </section>
      </div>
    );
  }
  return (
    <div className="cart-container">
      <Button label="Back to Store" icon='pi pi-book' onClick={()=>dispatch(switchCartPage())} className="store-btn text-sm md:text-base"></Button>
      <Toast ref={toastCart} />
      <section className="cart">
        <ConfirmDialog />
        <h2 className="flex align-items-center justify-content-center gap-2">
          Your Bag{" "}
          <i className="pi pi-shopping-bag" style={{ fontSize: "2rem" }}></i>
        </h2>
        <div className="cart-section">
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} removeToast={removeToast}></CartItem>;
          })}
        </div>
      </section>
      <div className="footer">
        <Button
          onClick={clearCartHandler}
          className="mt-5 mb-3 surface-900"
          icon="pi pi-times"
          label="Clear Cart"
        ></Button>

        {/* dispatch(clearCart(12) */}
        <hr />
        <div className="cart-total">
          <h4>
            Total <span>{total}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
