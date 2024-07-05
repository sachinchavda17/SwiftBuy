import express from "express";
import {
  addOrderController,
  cancelOrderController,
  getOrderController,
} from "../controllers/ordersControllers.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/addorders", addOrderController);
router.get("/fetch-user-order/:userId", getOrderController);
router.post("/cancel-order", cancelOrderController);
// router.put('/update-order',  updateOrder)
// router.get('/all-orders',  fetchAllOrders)

export default router;
