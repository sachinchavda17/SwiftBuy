import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from "./routes/auth.js"
import categoriesRoutes from "./routes/categories.js"
import productsRoutes from "./routes/products.js"
import ordersRoutes from "./routes/orders.js"
import bodyParser from "body-parser";
import Product from "./models/Product.js";
import {products} from "./data.js"
dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected! "))
  .catch((err) => console.log("Error while connecting mongo : ", err));

app.get("/", (req, res) => res.send("Server is live 🎉"));
app.use("/api/auth",authRoutes)
app.use("/api/categories",categoriesRoutes)
app.use("/api/products",productsRoutes)
app.use("/api/orders",ordersRoutes)

// await Product.insertMany(products)

// app.use("/orders")
app.listen(PORT, () => {
  console.log("Server is live 🎉 on port ", PORT);
});
