import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import DateFormat from "../../utils/DateFormat";
import axios from "axios";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import OrderDetailsModal from "./OrderDetailModal"; // Import the new modal component

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State for selected order details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchDataFromApi("/api/orders/all-orders");
        setOrders(data.orders || []);
       console.log(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  const chooseColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "dispatched":
        return "bg-blue-200 text-blue-800";
      case "delivered":
        return "bg-purple-200 text-purple-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setEditedOrder({ ...order });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_DEV_URL}/api/orders/updateorderstatus/${editingOrderId}`,
        {
          paymentStatus: editedOrder.paymentStatus,
          shippingStatus: editedOrder.shippingStatus,
        }
      );

      if (response.data.success) {
        toast.success("Order updated successfully!");
        setOrders(
          orders.map((order) =>
            order._id === editingOrderId ? editedOrder : order
          )
        );
        setEditingOrderId(null);
      } else {
        toast.error("Failed to update order.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setEditingOrderId(null);
  };

  const handleSelectChange = (e) => {
    setEditedOrder({ ...editedOrder, [e.target.name]: e.target.value });
  };

  const handleViewClick = (order) => {
    if (order && order._id) {
      setSelectedOrderId(order._id); // Ensure only the _id string is passed
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null); // Reset selectedOrderId to null
  };

  return (
    <div className="container mx-auto p-6 text-sm ">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-x-scroll">
          <thead>
            <tr className="text-gray-800 text-left uppercase text-sm border-b-2">
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Total Amount</th>
              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Last Update</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="py-3 px-6">#{order._id}</td>
                <td className="py-3 px-6">{DateFormat(order?.createdAt)}</td>
                <td className="py-3 px-6">₹{order.totalAmount}</td>

                <td className="py-3 px-6">
                  {editingOrderId === order._id ? (
                    <select
                      name="paymentStatus"
                      value={editedOrder.paymentStatus}
                      onChange={handleSelectChange}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Received">Received</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`${chooseColor(
                        order.paymentStatus
                      )} py-1 px-3 rounded-lg`}
                    >
                      {order.paymentStatus}
                    </span>
                  )}
                </td>

                <td className="py-3 px-6">
                  {editingOrderId === order._id ? (
                    <select
                      name="shippingStatus"
                      value={editedOrder.shippingStatus}
                      onChange={handleSelectChange}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`${chooseColor(
                        order.shippingStatus
                      )} py-1 px-3 rounded-lg`}
                    >
                      {order.shippingStatus}
                    </span>
                  )}
                </td>

                <td className="py-3 px-6">
                  {order?.shippingAddress?.street +
                    " " +
                    order?.shippingAddress?.city}
                </td>
                <td className="py-3 px-6">{DateFormat(order?.updatedAt)}</td>
                <td className="py-3 px-6 flex items-center gap-2">
                  {editingOrderId === order._id ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="text-green-500 py-2 rounded-lg hover:text-green-600 transition duration-300"
                      >
                        <FaSave fontSize={20} />
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="text-red-500 py-2 rounded-lg hover:text-red-600 transition duration-300"
                      >
                        <MdCancel fontSize={20} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-blue-500 py-2 rounded-lg hover:text-blue-600 transition duration-300"
                      onClick={() => handleEditClick(order)}
                    >
                      <FaRegEdit fontSize={20} />
                    </button>
                  )}
                  <button
                    className="text-green-500 py-2 ml-2 rounded-lg hover:text-green-600 transition duration-300"
                    onClick={() => handleViewClick(order)}
                  >
                    <FaEye fontSize={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderDetailsModal
        isOpen={isModalOpen}
        orderId={selectedOrderId}
        onClose={closeModal}
      />
    </div>
  );
};

export default OrderManagement;
