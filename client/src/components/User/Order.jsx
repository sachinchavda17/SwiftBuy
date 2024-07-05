import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../utils/context";
import toast from "react-hot-toast";
import { fetchDataFromApi, fetchDataPost } from "../../utils/api";
import Dialog from "./Dialog";

const Order = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useContext(Context);
  const userId = user?._id; // Handle potential null user
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const cancelOrder = async () => {
    if (!selectedOrderId || !userId) return;
    try {
      const response = await fetchDataPost(
        `/api/orders/cancel-order`,
        { orderId: selectedOrderId, userId },
        { withCredentials: true }
      );
      toast.success(response?.data?.message|| "Order Canceled!");
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.error || "Error in order calncelation");
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchDataFromApi(
          `/api/orders/fetch-user-order/${userId}`
        );
        setUserOrders(response.userOrder);
      } catch (error) {
        console.error("Error fetching orders:", error); // Log specific error

        if (error.response) {
          toast.error(error.response.data.error || "API error");
        } else {
          toast.error("Network error or CORS issue");
        }
      }
    };

    if (userId) {
      getOrders();
    }
  }, [userId,cancelOrder]);


  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-800";
      case "confirmed":
        return "bg-indigo-200 text-indigo-800";
      case "dispatched":
        return "bg-yellow-200 text-yellow-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-purple-200 text-purple-800";
    }
  };

  const formatDateToLocal = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleString();
  };

  if (userOrders?.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="text-gray-800 text-lg text-center p-5 bg-white rounded-lg shadow-md">
          You don't have any orders yet
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 flex flex-col items-center space-y-6">
        {!userOrders.error &&
          userOrders?.map((order) => (
            <div
              key={order?._id}
              className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition duration-300 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Order ID: #{order?._id}
                </h5>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Order Status:
                  </strong>{" "}
                  <span
                    className={`${chooseColor(
                      order?.orderStatus
                    )}  font-medium me-2 p-2  rounded-lg`}
                  >
                    {order?.orderStatus}
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                {order?.products.map((item) => (
                  <div
                    key={item?._id}
                    className="flex flex-col md:flex-row items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                  >
                    <img
                      src={item?.img}
                      alt=""
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600 mb-4 md:mb-0"
                    />
                    <div className="md:ml-4 text-center md:text-left">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item?.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {item?.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-center md:text-left">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Discount:
                  </strong>{" "}
                  {order?.discount} %
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Order Total:
                  </strong>{" "}
                  ₹ {order?.totalAmount}
                </p>

                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Payment Method:
                  </strong>{" "}
                  {order?.paymentMethod}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Payment Status:
                  </strong>{" "}
                  <span
                    className={`${
                      order?.paymentStatus === "received"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }  font-medium me-2 px-2.5 py-0.5 rounded-full`}
                  >
                    {order?.paymentStatus}
                  </span>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Order Created Date:
                  </strong>{" "}
                  {formatDateToLocal(order?.createdAt)}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Last Updated:
                  </strong>{" "}
                  {formatDateToLocal(order?.updatedAt)}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Address:
                  </strong>{" "}
                  {order.shippingAddress.street},{order.shippingAddress.city},
                  {order.shippingAddress.state}-{order.shippingAddress.pincode}
                </p>
              </div>

              {order && order.orderStatus !== "delivered" && order.orderStatus !== "cancelled" && (
                <div className="flex justify-end mt-1">
                  <button
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      setOpen(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      {selectedOrderId && (
        <Dialog
          open={open}
          setOpen={setOpen}
          cancelOrder={cancelOrder}
          selectedOrderId={selectedOrderId}
        />
      )}
    </>
  );
};

export default Order;
