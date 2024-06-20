import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
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
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    shippingAddress: {
      type: Object,
      ref: "Address",
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
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
