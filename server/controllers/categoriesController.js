import Category from "../models/Category.js";

export const addCategoryController = async (req, res) => {
  try {
    const { title, thumbnail } = req.body;
    if (!title || !thumbnail) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }

    const category = await Category.findOne({ title });
    if (category) {
      return res.status(400).json({ error: "Category already exists!" });
    }

    const newCategory = new Category({ title, thumbnail });
    await newCategory.save();
    res.status(201).json({ category: newCategory });
  } catch (err) {
    console.error("Error in Add Category Controller: ", err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const removeCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).json({ error: "Category doesn't exist!" });
    }

    await Category.deleteOne({ _id });
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    console.error("Error in Remove Category Controller: ", err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await Category.findById(_id).populate("products");
    if (!category) {
      return res.status(404).json({ error: "Category doesn't exist!" });
    }

    res.status(200).json({ category });
  } catch (err) {
    console.error("Error in Get Category Controller: ", err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    console.error("Error in Get All Categories Controller: ", err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, thumbnail } = req.body;
    if (!title || !thumbnail)
      return res.status(400).json({ error: "Please fill all the fields!" });
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).json({ error: "Category doesn't exist!" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      {
        title,
        thumbnail,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    console.error("Error in Update Categories Controller: ", err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
