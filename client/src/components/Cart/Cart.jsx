import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";

import { useNavigate } from "react-router-dom";

const Cart = ({ setShowCart }) => {
  const navigate = useNavigate();
  const { cartSubTotal, cartItems, user } = useContext(Context);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <div className="heading">Shopping Cart</div>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {cartItems?.length ? (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal : </span>
                <span className="text total">&#8377; {cartSubTotal} </span>
              </div>
              <div className="button">
                <div
                  className="checkout-cta"
                  onClick={() => {
                    navigate("/check");
                    setShowCart(false);
                  }}
                >
                  Checkout
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <BsCartX />
            <span>No Products in cart.</span>
            <button className="return-cta">RETURN TO SHOP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
