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
  const [paymentMethod, setPaymentMethod] = useState();
  const [shippingAddress, setShippingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressPage, setShowAddressPage] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (user?._id) {
          const addresses = await fetchDataFromApi(
            `/api/auth/getaddress/${user._id}`
          );
          setAddress(addresses);
          if (addresses.length > 0) {
            setShippingAddress(addresses[0]);
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
      <div className="mx-auto max-w-7xl py-3 px-4 mb-10 sm:px-6 lg:px-8 gap-3 bg-background dark:bg-secondary ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
          <div className="lg:col-span-3 shadow-lg shadow-border rounded p-5">
            <div
              className="text-white text-md px-5 py-2 mt-12 mb-6 bg-primary w-fit rounded-md  cursor-pointer  "
              onClick={() => setShowAddressPage(!showAddressPage)}
              >
              {!showAddressPage ? " + Add new Address " : "- Close Address Page"}
            </div>
              {showAddressPage && <Address setAddress={setAddress} />}
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-text dark:text-white">
                Your Addresses
              </h2>
              {/* <p className="mt-1 text-sm leading-6 text-text dark:text-gray-400">
                Choose from Existing addresses
              </p> */}
              {isLoading ? (
                <AddressSkeleton length={2} />
              ) : (
                <div role="list">
                  {address.length === 0 ? (
                    <p className="text-text dark:text-white">
                      No address found. Please add.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3  items-center gap-x-5 gap-y-3 mt-5 ">
                      {address.map((addr, index) => (
                        <label htmlFor={`address-${index}`} key={index}>
                          <div className="flex  items-center gap-x-5  px-4 py-4  rounded-md shadow-md shadow-border border-solid border-2 border-border dark:border-ternary">
                            <input
                              id={`address-${index}`}
                              onChange={() => setShippingAddress(addr)}
                              name="address"
                              type="radio"
                              checked={shippingAddress === addr}
                              value={index}
                              className="h-4 w-4 border-border dark:border-ternary text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="flex ">
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-text dark:text-white">
                                  {user?.firstName + " " + user?.lastName}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-text dark:text-gray-400">
                                  {addr.street} - {addr.pincode}
                                </p>
                              </div>
                            </div>
                            {/* <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-text dark:text-white">
                              {addr.phone}
                            </p>
                            <p className="text-sm leading-6 text-text dark:text-white">
                              {addr.city}
                            </p>
                          </div> */}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-10 space-y-10">
                <div>
                  <div className="text-lg font-semibold leading-6 text-text dark:text-text">
                    Payment
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3  items-center gap-x-5 gap-y-3 mt-5 ">
                    <div className="flex items-center border-2 border-border px-3 py-3 text-text dark:text-text rounded-lg shadow-md shadow-border dark:border-border dark:shadow-md bg-background dark:bg-background hover:opacity-80  cursor-pointer transition-all duration-200 ease-in-out">
                      <input
                        id="cash"
                        name="payments"
                        onChange={() => setPaymentMethod("cash")}
                        value="cash"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-border dark:border-gray-600 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="ml-3 block text-sm font-medium leading-6 "
                      >
                        <div>Cash on delivery </div>
                        <div className="text-xs opacity-70  ">
                          Pay after you got your package
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center border-2 border-border px-3 py-3 text-text dark:text-text rounded-lg shadow-md shadow-border dark:border-border dark:shadow-md bg-background dark:bg-background hover:opacity-80  cursor-pointer transition-all duration-200 ease-in-out">
                      <input
                        id="card"
                        name="payments"
                        onChange={() => setPaymentMethod("card")}
                        value="card"
                        type="radio"
                        checked={paymentMethod === "card"}
                        className="h-4 w-4 border-border dark:border-gray-600 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="ml-3 block text-sm font-medium leading-6 "
                      >
                        <div>Card</div>
                        <div className="text-xs opacity-70 ">
                          Pay with your card
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
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
