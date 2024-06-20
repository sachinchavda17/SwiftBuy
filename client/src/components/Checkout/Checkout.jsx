import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../utils/context";
import Address from "./Address";
import { fetchDataFromApi } from "../../utils/api";
import CheckoutCart from "./CheckoutCart";

function Checkout() {
  const { user, cartItems, cartSubTotal } = useContext(Context);
  const [address, setAddress] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingAddress, setShippingAddress] = useState(null);
 



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
      }
    };

    fetchAddresses();
  }, [user]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* This form is for address */}
            <Address setAddress={setAddress} />
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing addresses
              </p>
              <ul role="list">
                {address.length === 0
                  ? "No address found. Please add."
                  : address.map((addr, index) => (
                      <label htmlFor={`address-${index}`}>
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 px-5 py-5 mb-3 border-solid border-2 border-gray-200"
                        >
                          <div className="flex gap-x-4">
                            <input
                              id={`address-${index}`}
                              onChange={() => setShippingAddress(addr)}
                              name="address"
                              type="radio"
                              checked={shippingAddress === addr}
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {user?.firstName + " " + user?.lastName}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Street: {addr.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Pincode: {addr.pincode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              Phone: {addr.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                              {addr.city}
                            </p>
                          </div>
                        </li>
                      </label>
                    ))}
              </ul>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
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
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
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
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <CheckoutCart paymentMethod={paymentMethod} shippingAddress={shippingAddress} />
        </div>
      </div>
    </>
  );
}

export default Checkout;
