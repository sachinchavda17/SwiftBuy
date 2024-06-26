import "./Cart.scss"
import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CartItem from "./CartItem/CartItem";
import toast from "react-hot-toast";
import { BsCartX } from "react-icons/bs";
import { MdClose } from "react-icons/md";
const Cart = ({ setShowCart }) => {
  const navigate = useNavigate();
  const { cartSubTotal, cartItems, setCartItems, user } = useContext(Context);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const cart = await fetchDataFromApi(`/api/carts/get-cart/${user._id}`);
      setCartItems(cart.cart);
      let subTotal = 0;
      cart.cart.forEach((item) => {
        subTotal += item.product.price * item.quantity;
      });
      console.log(subTotal);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

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
            <button className="return-cta" onClick={() => setShowCart(false)}>
              RETURN TO SHOP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
