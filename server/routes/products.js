import express from "express";
import protectedRoute from "../utils/protectedRoute.js";
import {
  addProductController,
  getAllProductController,
  getProductController,
  getSearchProductController,
  removeProductController,
  updateProductController,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/addproduct",  addProductController);
router.post("/updateproduct/:pid",  updateProductController);
router.patch("/removeproduct/:pid",  removeProductController);
router.get("/getallproducts", getAllProductController);
router.get("/getproduct/:id",  getProductController);
router.get("/search/:query", getSearchProductController);

export default router;
