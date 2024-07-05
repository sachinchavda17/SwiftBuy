import express from "express";
import { fetchUserById, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/update-user/:id", updateUser);
router.get("/:id", fetchUserById);

export default router;
