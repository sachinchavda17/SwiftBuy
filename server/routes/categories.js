import express from "express";
import {
  addCategoryController,
  getAllCategoriesController,
  getCategoryController,
  removeCategoryController,
  updateCategoryController,
} from "../controllers/categoriesController.js";
import protectedRoute from "../utils/protectedRoute.js";

const router = express.Router();

router.post("/addcategory", addCategoryController);
router.patch("/removecategory/:_id", removeCategoryController);
router.get("/getcategory/:_id", getCategoryController);
router.get("/getallcategories", getAllCategoriesController);
router.post("/updatecategory/:_id", updateCategoryController);

export default router;
