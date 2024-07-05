import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/context";
import { fetchDataFromApi, fetchDataPost } from "../../utils/api";
import toast from "react-hot-toast";
import AddressModal from "./AddressModal";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [editAddress, setEditAddress] = useState(null);
  const { user } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState([]);

  const handleEditForm = (index) => {
    const addressToEdit = address[index];
    setEditAddress(addressToEdit);
    setSelectedEditIndex(index);
    setOpenModal(true);
  };

  const handleAdd = (newAddress) => {
    if (selectedEditIndex === -1) {
      setAddress((prevAddresses) => [...prevAddresses, newAddress]);
    } else {
      handleEdit(newAddress);
    }
    setOpenModal(false);
  };

  const handleEdit = async (addressUpdate) => {
    try {
      const newUser = { ...user, addresses: [...user.addresses] };
      newUser.addresses[selectedEditIndex] = addressUpdate;

      const response = await fetchDataPost(
        `/api/user/update-user/${user._id}`,
        newUser
      );

      setAddress(response.user.addresses);
      toast.success("Address updated.");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
    setOpenModal(false);
  };

  const handleOpenAddForm = () => {
    setSelectedEditIndex(-1);
    setEditAddress(null);
    setOpenModal(true);
  };

// Example of updating state correctly after deletion
const handleRemove = async (index) => {
  try {
    const newUser = { ...user };
    newUser.addresses.splice(index, 1);

    const response = await fetchDataPost(
      `/api/user/update-user/${user._id}`,
      newUser
    );

    setAddress(response.user.addresses); // Update state after successful deletion
    toast.success("Address removed successfully.");
  } catch (error) {
    console.error("Error removing address:", error);
    toast.error("Failed to remove address.");
  }
};


const fetchAddresses = async () => {
  try {
    if (user?._id) {
      const addresses = await fetchDataFromApi(
        `/api/auth/getaddress/${user._id}`
      );
      setAddress(addresses); // Update state with fetched addresses
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    toast.error("Failed to fetch addresses.");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchAddresses();
  }, [user,openModal]);

  return (
    <>
      <div className="flex justify-center items-center w-full pt-10 bg-gray-100 dark:bg-gray-900 ">
        {user && (
          <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold text-center text-indigo-800 mb-8">
              User Profile
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-indigo-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="w-full p-3 bg-indigo-50 border border-indigo-300 text-indigo-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                    placeholder="First name"
                    value={user?.firstName}
                    disabled
                  />
                </div>
                {user.lastName && (
                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-indigo-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="w-full p-3 bg-indigo-50 border border-indigo-300 text-indigo-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                      placeholder="Last name"
                      value={user?.lastName}
                      disabled
                    />
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-indigo-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-indigo-50 border border-indigo-300 text-indigo-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                  placeholder="your.email@mail.com"
                  value={user?.email}
                  disabled
                />
              </div>
            </div>

            <h4 className="text-2xl font-medium text-indigo-800 mt-10 text-center">
              Your Addresses
            </h4>
            <div className="flex flex-col gap-4 mt-6">
              {address.map((addr, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg shadow-sm"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-indigo-700">
                      {addr?.street}
                    </p>
                    <span className="text-xs text-indigo-600">
                      {addr?.city}, {addr?.state} - {addr?.pincode}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditForm(index)}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleOpenAddForm}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-200"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              Add New Address
            </button>
          </div>
        )}
      </div>
      {openModal && (
        <AddressModal
          setShowModal={setOpenModal}
          setAddress={setAddress}
          editAddress={editAddress}
          selectedEditIndex={selectedEditIndex}
        />
      )}
    </>
  );
};

export default UserProfile;
