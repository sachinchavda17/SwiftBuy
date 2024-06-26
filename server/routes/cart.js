import express from "express";
import {
  addCartController,
  getUserCartController,
  removeCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-cart/:userId", addCartController);
router.get("/get-cart/:userId", getUserCartController);
router.delete("/remove-cart/:userId/:productId", removeCartController);

export default router;
