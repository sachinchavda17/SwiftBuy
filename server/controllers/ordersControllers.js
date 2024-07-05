import Order from "../models/Order.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const addOrderController = async (req, res) => {
  try {
    const { userId, products, paymentMethod, shippingAddress, totalAmount } =
      req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products in the order" });
    }

    if (!paymentMethod || !shippingAddress) {
      return res
        .status(400)
        .json({ error: "Payment method and shipping address are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User does not exist!" });

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.title,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    const newOrder = new Order({
      user:userId, // Assuming 'user' field is defined in your Order schema
      products,
      paymentMethod,
      shippingAddress,
      totalAmount,
      paymentStatus: "Pending",
      shippingStatus: "Pending",
      orderStatus: "Pending",
      stripeSessionId: session.id,
    });

    await newOrder.save();
    user.orders.push(newOrder._id);
    await user.save();

    res.status(200).json({ orderId: newOrder._id, stripeSession: session });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Generic error message for production
  }
};



export const getOrderController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const userOrder = await Order.find({ user: userId }).populate("products");

    if (userOrder.length === 0) {
      return res.status(404).json({ error: "No orders were made!" });
    }
    res.status(200).json({ userOrder });
  } catch (error) {
    console.error("Error in fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
      const { orderId, userId } = req.body;
      if (!orderId || !userId) {
          return res.status(400).json({ error: "Invalid request data" });
      }
      const order = await Order.findById(orderId);
      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }
      if (order.user.toString() !== userId) {
          return res.status(403).json({ error: "You are not authorized to cancel this order" });
      }
      if (order.orderStatus === 'delivered') {
          return res.status(400).json({ error: "Order cannot be cancelled at this stage" });
      }
      order.orderStatus = 'cancelled';
      order.paymentStatus = 'cancelled';
      await order.save();
      res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
      console.log("Error in cancelling order ! ::" + err.message);
      res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
  }
}