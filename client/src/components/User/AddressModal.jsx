import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchDataPost } from "../../utils/api";
import { Context } from "../../utils/context";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";

const AddressModal = ({
  setShowModal,
  setAddress,
  editAddress,
  selectedEditIndex,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { user } = useContext(Context);

  const addAddress = async (data) => {
    try {
      const response = await fetchDataPost("/api/auth/addaddress", {
        ...data,
        userId: user._id,
      });
      if(response.address){
        
        setAddress((prevAddresses) => [...prevAddresses, response.address]);
        toast.success("Address added.");
      }
      reset();
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateAddress = async (data) => {
    try {
      const newUser = { ...user, addresses: [...user.addresses] };
      newUser.addresses[selectedEditIndex] = data;

      const response = await fetchDataPost(
        `/api/user/update-user/${user._id}`,
        newUser
      );

      setAddress(response.user.addresses);
      toast.success("Address updated.");
      reset();
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (editAddress) {
      setValue("email", editAddress.email);
      setValue("phone", editAddress.phone);
      setValue("street", editAddress.street);
      setValue("city", editAddress.city);
      setValue("state", editAddress.state);
      setValue("pincode", editAddress.pincode);
    }
  }, [editAddress, setValue]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center text-lg px-8 py-4 font-medium text-gray-900 border-b-2 border-border">
          <span>{editAddress ? "Edit Address" : "Add Address"}</span>
          <span
            className="hover:bg-ternary px-3 py-2 text-sm text-gray-500 rounded-md"
            onClick={() => setShowModal(false)}
          >
            <ImCross />
          </span>
        </div>
        <form
          className="space-y-6 p-8"
          noValidate
          onSubmit={handleSubmit((data) => {
            editAddress ? updateAddress(data) : addAddress(data);
          })}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 border border-border w-full rounded-md focus:border-primary sm:text-sm shadow-md"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                  placeholder="Enter your phone"
                  className="px-3 py-2 border border-border w-full rounded-md shadow-md focus:border-primary sm:text-sm"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street address
              </label>
              <div className="mt-1">
                <input
                  id="street"
                  {...register("street", {
                    required: "Street address is required",
                  })}
                  placeholder="Enter your street"
                  type="text"
                  className="px-3 py-2 border border-border w-full rounded-md shadow-md focus:border-primary sm:text-sm"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <div className="mt-1">
                <input
                  id="city"
                  {...register("city", { required: "City is required" })}
                  type="text"
                  placeholder="Enter your city"
                  className="px-3 py-2 border border-border w-full rounded-md shadow-md focus:border-primary sm:text-sm"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <div className="mt-1">
                <input
                  id="state"
                  {...register("state", { required: "State is required" })}
                  type="text"
                  placeholder="Enter your state"
                  className="px-3 py-2 border border-border w-full rounded-md shadow-md focus:border-primary sm:text-sm"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal code
              </label>
              <div className="mt-1">
                <input
                  id="pincode"
                  {...register("pincode", { required: "Pincode is required" })}
                  type="text"
                  placeholder="Enter your ZIP"
                  className="px-3 py-2 border border-border w-full rounded-md shadow-md focus:border-primary sm:text-sm"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full shadow-md"
          >
            {editAddress ? "Update Address" : "Add Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
