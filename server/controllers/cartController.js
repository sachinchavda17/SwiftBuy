import User from "../models/User.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";

export const addCartController = async (req, res) => {
  try {
    const { pId, quantity,discountedPrice } = req.body;
    const { userId } = req.params;

    if (!pId || !quantity || quantity <= 0 || !discountedPrice) {
      return res.status(400).json({ error: "Invalid product or quantity or price" });
    }

    const product = await Product.findById(pId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex((item) =>
      item.product.equals(pId)
    );

    if (existingProductIndex > -1) {
      // If the product exists in the cart, update the quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pId, quantity,discountedPrice });
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserCartController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the cart for the user and populate product details
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title price desc img stock",
    });

    if (!cart) {
      return res.status(404).json({ error: "Your Cart is Empty." });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching user cart:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeCartController = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ error: "Invalid user ID or product ID" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found for this user" });
    }

    // Check if the product exists in the cart
    const productIndex = cart.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ error: "Product not found in the user's cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);
    await cart.save();

    res
      .status(200)
      .json({ message: "Product removed from cart successfully", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
