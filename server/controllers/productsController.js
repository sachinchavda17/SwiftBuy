import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const addProductController = async (req, res) => {
  try {
    const { title, desc, price, discountPercentage, rating, stock, img, cId } =
      req.body;

    if (
      !title ||
      !desc ||
      !price ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !img ||
      !cId
    ) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }

    // Check if the category exists
    const category = await Category.findById(cId);
    if (!category) {
      return res.status(400).json({ error: "Category does not exist!" });
    }

    // Check if the product already exists
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists!" });
    }

    // Create and save the new product
    const newProduct = new Product({
      title,
      desc,
      price,
      discountPercentage,
      rating,
      stock,
      img,
      category: cId,
    });
    await newProduct.save();

    // Add the new product ID to the category's products array and save
    category.products.push(newProduct._id);
    await category.save();

    res.status(201).json({ product: newProduct, category });
  } catch (err) {
    console.log("Error in adding product: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { title, desc, price, discountPercentage, rating, stock, img, cId } =
      req.body;
    const { pid } = req.params;

    if (
      !title ||
      !desc ||
      !price ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !img ||
      !cId
    ) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ error: "Product doesn't exist!" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      {
        title,
        desc,
        price,
        discountPercentage,
        rating,
        stock,
        img,
        category: cId,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ product: updatedProduct });
  } catch (err) {
    console.log("Error in updating product " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const removeProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ error: "Product does not exist!" });
    }

    // Remove product from category's products array
    await Category.updateOne(
      { _id: product.category },
      { $pull: { products: pid } }
    );

    await Product.deleteOne({ _id: pid });
    res.status(200).json({ message: "Successfully Deleted." });
  } catch (err) {
    console.log("Error in removing product: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    // Fetch the product by ID
    const product = await Product.findById(pid).populate("category");
    if (!product) {
      return res.status(404).json({ error: "Product does not exist!" });
    }

    // Fetch related products based on the category of the fetched product
    const relatedProducts = await Product.find({
      category: cid, // Assuming `cId` is the category ID field in your Product schema
      _id: { $ne: pid }, // Exclude the fetched product itself
    });

    res.status(200).json({ product, relatedProducts });
  } catch (err) {
    console.log("Error in getting related products: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found!" });
    }
    res.status(200).json({ products });
  } catch (err) {
    console.log("Error in getting products: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getSearchProductController = async (req, res) => {
  try {
    const { query } = req.params;
    const regexPattern = new RegExp(query, "i");

    const products = await Product.find({ title: { $regex: regexPattern } });
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found!" });
    }
    res.status(200).json({ products });
  } catch (err) {
    console.log("Error in getting search products: " + err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
