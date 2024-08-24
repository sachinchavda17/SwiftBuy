import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderDetailsModal = ({ isOpen, orderId, onClose }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_DEV_URL}/api/orders/get/${orderId}`
          );
          console.log(response.data.order);
          setOrder(response.data.order);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };

      fetchOrderDetails();
    } else {
      setOrder(null); // Clear the previous order data when modal is closed
    }
  }, [isOpen, orderId]);

  if (!isOpen || !order) {
    return null; // Do not render anything if modal is not open or order is not loaded
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
      >
        <h3 className="text-2xl font-bold mb-4">Order Details</h3>
        <p>
          <strong>Order ID:</strong> #{order._id}
        </p>
        <p>
          <strong>Discount:</strong> {order.discount || "N/A"}
        </p>
        <div className="mt-4">
          {order.products?.map((product, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={product.img}
                alt={product.title}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <p className="font-bold">{product.title}</p>
                <p>
                  {product.quantity} x ₹{product.price} = ₹
                  {product.quantity * product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p>
          <strong>Total:</strong> ₹{order.totalAmount || "N/A"}
        </p>
        <button
          onClick={onClose}
          className=" mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
