import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "received", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "dispatched", "delivered", "cancelled"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },

    deliveryDate: Date,

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
