import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: {
    type: Number,
    default: 1,
  },
  img: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
