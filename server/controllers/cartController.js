import User from "../models/User.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const addCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { pId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User doesn't exist!" });

    const product = await Product.findById(pId);
    if (!product)
      return res.status(404).json({ error: "Product doesn't exist!" });

    let existingCartItem = await Cart.findOne({
      user: userId,
      product: pId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ cart: existingCartItem });
    }

    const newCart = new Cart({
      user: userId,
      product: pId,
      quantity,
    });
    await newCart.save();
    user.carts.push(newCart._id);
    await user.save();
    res.status(201).json({ cart: newCart });
  } catch (err) {
    console.log("Error in adding cart: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getUserCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User doesn't exist!" });

    const cart = await Cart.find({ user: userId }).populate("product");
    if (!cart.length) return res.status(404).json({ empty: "Cart is empty!" });

    res.status(200).json({ cart });
  } catch (err) {
    console.log("Error in getting cart: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const removeCartController = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User doesn't exist!" });

    const cartItem = await Cart.findOneAndDelete({
      user: userId,
      product: productId,
    });
    if (!cartItem)
      return res.status(404).json({ error: "Product not found in cart!" });

    user.carts.pull(cartItem._id);
    await user.save();

    res.status(200).json({ success: "Item successfully deleted." });
  } catch (err) {
    console.log("Error in deleting cart: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
