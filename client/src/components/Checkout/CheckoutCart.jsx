import React, { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handleCashPayment = async () => {
    setIsLoading(true);
    try {
      if (
        !paymentMethod ||
        !shippingAddress ||
        !cartItems ||
        cartItems.length === 0
      ) {
        return toast.error("Please fill all the fields!");
      }

      const requestData = {
        userId: user._id,
        products: cartItems,
        paymentMethod,
        shippingAddress,
        totalAmount: cartSubTotal,
      };

      console.log("Request Data:", requestData);

      const response = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/api/orders/addorders`,
        requestData
      );

      if (response.status === 200) {
        toast.success("Order Placed Successfully");
        navigate("/"); // Redirect to homepage or order success page
      } else {
        toast.error("Failed to place the order.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePayment = async () => {
  //   setIsLoading(true);
  //   try {
  //     if (!paymentMethod || !shippingAddress || !cartItems) {
  //       return toast.error("Please fill all the fields!");
  //     }

  //     const requestData = {
  //       userId: user._id,
  //       products: cartItems,
  //       paymentMethod,
  //       shippingAddress,
  //       totalAmount: cartSubTotal,
  //     };

  //     console.log("Request Data:", requestData);

  //     const stripe = await stripePromise;
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_DEV_URL}/api/orders/addorders`,
  //       requestData
  //     );

  //     localStorage.setItem("orderData", JSON.stringify(response));
  //     const { id } = response.data.stripeSession;
  //     await stripe.redirectToCheckout({ sessionId: id });
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setIsLoading(false); // Set loading state to false when payment ends
  //   }
  // };
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      if (
        !paymentMethod ||
        !shippingAddress ||
        !cartItems ||
        cartItems.length === 0
      ) {
        return toast.error("Please fill all the fields!");
      }

      const requestData = {
        userId: user._id,
        products: cartItems,
        paymentMethod,
        shippingAddress,
        totalAmount: cartSubTotal,
      };

      console.log("Request Data:", requestData);

      const stripe = await stripePromise;
      const response = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/api/orders/addorders`,
        requestData
      );

      const { stripeSession } = response.data;

      if (stripeSession) {
        // Redirect to Stripe checkout page
        await stripe.redirectToCheckout({ sessionId: stripeSession.id });
      } else {
        toast.error("Failed to create Stripe session.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2  shadow-lg shadow-border rounded py-3">
      <div className="mx-auto mt-6 bg-background dark:bg-secondary px-2 sm:px-2 lg:px-4  p-5 ">
        <div className="">
          <h1 className="text-4xl mt-3 font-bold tracking-tight text-primary text-center  ">
            <span className="border-b-2 px-3 border-primary  ">Cart</span>
          </h1>
          <div className="flow-root">
            <ul
              role="list"
              className="my-6 divide-y divide-border dark:divide-ternary"
            >
              {cartItems?.map((item, id) => (
                <li key={id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border dark:border-ternary">
                    <img
                      src={item?.product?.img}
                      alt={item?.product?.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-text dark:text-white">
                        <h3>{item?.product?.title}</h3>
                        <p className="ml-4">₹{item?.discountedPrice}</p>
                      </div>
                      <p className="mt-1 text-sm text-text dark:text-gray-400">
                        {item.category}
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
          {/* <p className="mt-0.5 text-sm text-text dark:text-gray-400">
            Shipping and taxes calculated at checkout.
          </p> */}
          <div className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                <Loading />
              </div>
            ) : (
              // <div
              //   onClick={handlePayment}
              //   className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              // >
              //   Order Now
              // </div>
              <div className="space-y-3">
                {paymentMethod && paymentMethod === "card" ? (
                  <button
                    onClick={handlePayment}
                    className="flex w-full items-center justify-center rounded-lg bg-primary hover:bg-secondary px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-green-300"
                  >
                    Proceed to Card Payment
                  </button>
                ) : (
                  <button
                    onClick={handleCashPayment}
                    className="flex w-full items-center justify-center rounded-lg bg-primary hover:bg-secondary px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Place Order
                  </button>
                )}
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
