import Order from "../models/Order.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const addOrderController = async (req, res) => {
  try {
    const { userId, products, paymentMethod, shippingAddress, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products in the order" });
    }

    if (!paymentMethod || !shippingAddress) {
      return res.status(400).json({ error: "Payment method and shipping address are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User does not exist!" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "User's cart not found" });

    let stripeSessionId = null;

    if (paymentMethod === "card") {
      // Calculate the line items for Stripe checkout
      const lineItems = products.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: ((item.product.price * (1 - item.product.discountPercentage / 100)) * 100),
        },
        quantity: item.quantity,
      }));

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });

      stripeSessionId = session.id;
    }

    // Create a new order in the database
    const newOrder = new Order({
      user: userId,
      products,
      paymentMethod,
      shippingAddress,
      totalAmount,
      paymentStatus:  "pending" ,
      shippingStatus: "pending",
      orderStatus: paymentMethod === "card" ? "pending" : "confirmed",
      stripeSessionId,
    });

    await newOrder.save();
    user.orders.push(newOrder._id);
    await user.save();

    // Remove the ordered items from the user's cart
    cart.products = cart.products.filter(
      (cartItem) => !products.some(
        (orderItem) => String(orderItem.product._id) === String(cartItem.product._id)
      )
    );

    // Save the updated cart
    await cart.save();

    if (paymentMethod === "card") {
      return res.status(200).json({ orderId: newOrder._id, stripeSession: session });
    } else {
      return res.status(200).json({ orderId: newOrder._id, message: "Order placed successfully with Cash on Delivery" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res
        .status(403)
        .json({ error: "You are not authorized to cancel this order" });
    }
    if (order.orderStatus === "delivered") {
      return res
        .status(400)
        .json({ error: "Order cannot be cancelled at this stage" });
    }
    order.orderStatus = "cancelled";
    order.paymentStatus = "cancelled";
    await order.save();
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.log("Error in cancelling order ! ::" + err.message);
    res.status(501).json({ error: "INTERNAL SERVER ERROR!" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Order updated", order: updatedOrder });
  } catch (error) {
    console.error("Error in Update Order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in Fetch Orders by User:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products");
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in Fetch All Orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const order = await Order.findById(id).populate("products");
      
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error in Fetch Order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
