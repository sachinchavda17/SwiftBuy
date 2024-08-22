// import express from "express";
// import Order from "../models/Order.js";

// const router = express.Router();

// router.post("/addorders", addOrderController);
// router.get("/fetch-user-order/:userId", getOrderController);
// router.post("/cancel-order", cancelOrderController);
// // router.put('/update-order',  updateOrder)
// // router.get('/all-orders',  fetchAllOrders)

// export default router;



import {
  addOrderController,
  cancelOrderController,
  getOrderController,
  getAllOrders,
  updateOrder,
} from "../controllers/ordersControllers.js";
import express from "express";

const router = express.Router();

router.post("/addorders", addOrderController);
router.get("/fetch-user-order/:userId", getOrderController);
router.delete("/cancel-order", cancelOrderController);
router.get("/all-orders", getAllOrders); // Admin only
router.put("/update-order/:id", updateOrder);


export default router;
