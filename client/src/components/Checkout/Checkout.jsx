import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../utils/context";
import { fetchDataFromApi } from "../../utils/api";
import Address from "./Address";
import CheckoutCart from "./CheckoutCart";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddressSkeleton from "../skeletons/AddressSkeleton";

const Checkout = () => {
  const { user, cartItems } = useContext(Context);
  const [address, setAddress] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingAddress, setShippingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (user?._id) {
          const addresses = await fetchDataFromApi(
            `/api/auth/getaddress/${user._id}`
          );
          setAddress(addresses);
          if (addresses.length > 0) {
            setShippingAddress(addresses[0]); // Set the first address as default
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  if (cartItems.length === 0) return <Navigate to="/" />;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-background dark:bg-secondary">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Address setAddress={setAddress} />
            <div className="border-b border-border dark:border-ternary pb-12">
              <h2 className="text-base font-semibold leading-7 text-text dark:text-white">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-text dark:text-gray-400">
                Choose from Existing addresses
              </p>
              {isLoading ? (
                <AddressSkeleton length={2} />
              ) : (
                <ul role="list">
                  {address.length === 0 ? (
                    <p className="text-text dark:text-white">
                      No address found. Please add.
                    </p>
                  ) : (
                    address.map((addr, index) => (
                      <label htmlFor={`address-${index}`} key={index}>
                        <li className="flex justify-between gap-x-6 px-5 py-5 mb-3 border-solid border-2 border-border dark:border-ternary">
                          <div className="flex gap-x-4">
                            <input
                              id={`address-${index}`}
                              onChange={() => setShippingAddress(addr)}
                              name="address"
                              type="radio"
                              checked={shippingAddress === addr}
                              value={index}
                              className="h-4 w-4 border-border dark:border-ternary text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-text dark:text-white">
                                {user?.firstName + " " + user?.lastName}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-text dark:text-gray-400">
                                Street: {addr.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-text dark:text-gray-400">
                                Pincode: {addr.pincode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-text dark:text-white">
                              Phone: {addr.phone}
                            </p>
                            <p className="text-sm leading-6 text-text dark:text-white">
                              {addr.city}
                            </p>
                          </div>
                        </li>
                      </label>
                    ))
                  )}
                </ul>
              )}

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-text dark:text-white">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-text dark:text-gray-400">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        onChange={() => setPaymentMethod("cash")}
                        value="cash"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-border dark:border-ternary text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-text dark:text-white"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        onChange={() => setPaymentMethod("card")}
                        name="payments"
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-border dark:border-ternary text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-text dark:text-white"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <CheckoutCart
            paymentMethod={paymentMethod}
            shippingAddress={shippingAddress}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
