import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../skeletons/Loading";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const pageType = id ? "update" : "new";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DEV_URL}/api/categories/getallcategories`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();

    if (pageType === "update") {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_DEV_URL}/api/products/getproduct/${id}`
          );
          setProduct(response.data.product);
          // Prefill the form with the product data
          const fields = [
            "title",
            "img",
            "desc",
            "category",
            "price",
            "discountPercentage",
            "rating",
            "stock",
          ];
          fields.forEach((field) =>
            setValue(field, response.data.product[field])
          );
          // Ensure the category is set to the correct value
          setValue("category", response.data.product.category._id);
        } catch (error) {
          console.log("Error fetching product:", error);
          toast.error("Failed to fetch product. Please try again.");
        }
      };

      fetchProduct();
    }
  }, [id, pageType, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let response;
      if (pageType === "new") {
        response = await axios.post(
          `${process.env.REACT_APP_DEV_URL}/api/products/addproduct`,
          { ...data, cId: data.category }
        );
      } else if (pageType === "update") {
        response = await axios.post(
          `${process.env.REACT_APP_DEV_URL}/api/products/updateproduct/${id}`,
          { ...data, cId: data.category }
        );
      } else {
        toast.error("No page found");
        return;
      }

      if (response.data.product) {
        toast.success(
          pageType === "new"
            ? "Product added successfully!"
            : "Product updated successfully!"
        );
        pageType === "new" && reset();
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast.error("Failed to add/update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_DEV_URL}/api/products/removeproduct/${id}`
      );
      if (response.data && response.data.error) {
        toast.error("Failed to delete product. Please try again.");
        return;
      }
      toast.success("Product deleted successfully!");
      navigate("/products"); // Redirect to products list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageType === "update" && !product) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-background text-text p-8 border border-border shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-text mb-6">
        {pageType === "update" ? "Update Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-text"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Product Title"
            {...register("title", { required: "Title is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-border"
            } text-text bg-background rounded-md  text-text bg-background shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-text"
          >
            Image URL
          </label>
          <input
            type="text"
            id="img"
            placeholder="Product Image URL"
            {...register("img", { required: "Image URL is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.img ? "border-red-500" : "border-border"
            } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.img && (
            <p className="mt-1 text-sm text-red-600">{errors.img.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-text"
          >
            Description
          </label>
          <textarea
            id="desc"
            rows={4}
            placeholder="Product Description"
            {...register("desc", { required: "Description is required" })}
            className={`mt-1 block w-full px-3 py-3 border ${
              errors.desc ? "border-red-500" : "border-border"
            } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.desc && (
            <p className="mt-1 text-sm text-red-600">{errors.desc.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-text"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.category ? "border-red-500" : "border-border"
            } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            defaultValue={product ? product.category._id : ""}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-text"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Product Price"
              {...register("price", { required: "Price is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.price ? "border-red-500" : "border-border"
              } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-medium text-text"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              id="discountPercentage"
              placeholder="Discount Percentage"
              {...register("discountPercentage", {
                required: "Discount Percentage is required",
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.discountPercentage ? "border-red-500" : "border-border"
              } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.discountPercentage && (
              <p className="mt-1 text-sm text-red-600">
                {errors.discountPercentage.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-text"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              placeholder="Product Rating"
              {...register("rating", { required: "Rating is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.rating ? "border-red-500" : "border-border"
              } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-text"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Product Stock"
              {...register("stock", { required: "Stock is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.stock ? "border-red-500" : "border-border"
              } text-text bg-background rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-between gap-5">
          <button
            type="submit"
            className="w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loading />
            ) : pageType === "update" ? (
              "Update"
            ) : (
              "Add Product"
            )}
          </button>

          {pageType === "update" && (
            <button
              type="button"
              className="w-1/2 bg-red-500 text-gray-200 py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            className="w-1/2 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
