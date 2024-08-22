import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Simulated API call
      const data = await fetchDataFromApi("/api/orders/all-orders");
      console.log(data.orders);
      setOrders(data.orders || []);
    };
    fetchOrders();
  }, []);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
      case "Confirmed":
        return "bg-green-200 text-green-800";
      case "dispatched":
      case "Dispatched":
        return "bg-blue-200 text-blue-800";
      case "delivered":
      case "Delivered":
        return "bg-purple-200 text-purple-800";
      case "cancelled":
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800 text-left">
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Total Amount</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="py-3 px-6">{order._id}</td>
                <td className="py-3 px-6">
                  {order?.user?.firstName + " " + order?.user?.lastName}
                </td>
                <td className="py-3 px-6">₹{order.totalAmount}</td>
                <td className="py-3 px-6">
                  <span
                    className={`${chooseColor(
                      order.shippingStatus
                    )} py-1 px-3 rounded-lg`}
                  >
                    {order.shippingStatus}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    View
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg shadow hover:bg-red-600 transition duration-300">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
