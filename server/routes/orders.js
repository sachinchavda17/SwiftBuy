import express from "express"
import { addOrderController } from "../controllers/ordersControllers.js"

const router = express.Router()

router.post("/addorders",addOrderController)

export default router