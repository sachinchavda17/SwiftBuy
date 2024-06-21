import React, { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../skeletons/Loading";

const CheckoutCart = ({ paymentMethod, shippingAddress }) => {
  const {
    cartItems,
    cartSubTotal,
    user,
    handleCartProductQuantity,
    handleRemoveFromCart,
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    setIsLoading(true); // Set loading state to true when payment starts
    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/api/orders/addorders`,
        {
          userId: user._id,
          products: cartItems,
          paymentMethod,
          shippingAddress,
          totalAmount: cartSubTotal,
        }
      );

      const { id } = response.data.stripeSession;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false when payment ends
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="mx-auto mt-12 bg-background dark:bg-secondary px-2 sm:px-2 lg:px-4">
        <div className="border-t border-border dark:border-ternary px-0 py-6 sm:px-0">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-text dark:text-white">
            Cart
          </h1>
          <div className="flow-root">
            <ul
              role="list"
              className="-my-6 divide-y divide-border dark:divide-ternary"
            >
              {cartItems?.map((item, id) => (
                <li key={id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border dark:border-ternary">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-text dark:text-white">
                        <h3>
                          <Link href={item.img}>{item.title}</Link>
                        </h3>
                        <p className="ml-4">₹ {item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-text dark:text-gray-400">
                        {item.category.title}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm my-1">
                      <div className="flex text-text dark:text-text bg-background dark:bg-background">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-text dark:text-white"
                        >
                          Qty
                        </label>
                        <div className="flex items-center justify-center w-fit border border-1 border-border  h-8 mb-2 dark:border-border">
                          <span
                            className="border-r border-border dark:border-border py-0  cursor-pointer flex items-center justify-center w-10"
                            onClick={() =>
                              handleCartProductQuantity("dec", item)
                            }
                          >
                            -
                          </span>
                          <span className="flex items-center justify-center w-10">
                            {item?.quantity}
                          </span>
                          <span
                            className="border-l border-border dark:border-border py-0  cursor-pointer flex items-center justify-center w-10"
                            onClick={() =>
                              handleCartProductQuantity("inc", item)
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-primary dark:text-secondary hover:text-indigo-500"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border dark:border-ternary px-2 py-6 sm:px-2">
          <div className="flex justify-between my-2 text-base font-medium text-text dark:text-white">
            <p>Subtotal</p>
            <p>₹ {cartSubTotal}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-text dark:text-white">
            <p>Total Items in Cart</p>
            <p>{cartItems.length} items</p>
          </div>
          <p className="mt-0.5 text-sm text-text dark:text-gray-400">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                <Loading />
              </div>
            ) : (
              <div
                onClick={handlePayment}
                className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Order Now
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-text dark:text-gray-400">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-primary dark:text-secondary hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
