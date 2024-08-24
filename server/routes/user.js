import express from "express";
import {
  fetchUserById,
  fetchAllUsers,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", fetchUserById);
router.put("/update/:id", updateUserController);
router.delete("/delete/:id", deleteUserController);
router.get("/", fetchAllUsers); 

export default router;

