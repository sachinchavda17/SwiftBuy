import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../../utils/context";

const CartItem = () => {
  const { handleRemoveFromCart, cartItems, handleCartProductQuantity } =
    useContext(Context);

  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div key={item._id} className="cart-product">
          <div className="img-container">
            <img src={item?.product?.img} alt="" />
          </div>
          <div className="prod-details">
            <span className="name">{item?.product?.title}</span>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />

            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", item)}>
                -
              </span>
              <span>{item?.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", item)}>
                +
              </span>
            </div>
            <div className="text">
              <span>{item?.quantity}</span>
              <span>x</span>
              <span className="highlight">
                &#8377;{item?.product?.price * item?.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
