import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/authController.js";
import protectedRoute from "../utils/protectedRoute.js";
import {
  addressController,
  getAddressController,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/addaddress", addressController);
router.get("/getaddress/:userId", getAddressController);

export default router;
