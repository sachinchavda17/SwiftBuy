import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/authController.js";
import protectedRoute from "../utils/protectedRoute.js";
import {
  addAddressController,
  getAddressController,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/addaddress", addAddressController);
router.get("/getaddress/:userId", getAddressController);

export default router;
