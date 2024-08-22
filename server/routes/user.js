import express from "express";
import { fetchUserById, updateUser, deleteUser, fetchAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/update-user/:id", updateUser);
router.get("/:id", fetchUserById);
router.delete("/:id", deleteUser);
router.get("/", fetchAllUsers);  // Fetch all users (admin only)

export default router;
