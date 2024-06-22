import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchDataPost } from "../../utils/api";
import Loading from "../skeletons/Loading";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetchDataPost("/api/categories/addcategory", data);

      console.log(response);
      if (response.category) {
        toast.success("Category added successfully!");
        reset();
        return;
      }
      if (response && response.response.data.error) {
        toast.error(response.response.data.error);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-background text-text  p-8 border border-border dark:border-border shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-text mb-6">
        {id ? "Update Category" : "Add Category"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-text "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Category Title"
            {...register("title", { required: "Title is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? "border-red-500 " : "border-border"
            } rounded-md text-text bg-background shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-text"
          >
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            placeholder="Category Thumbnail"
            {...register("thumbnail", {
              required: "Thumbnail URL is required",
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.thumbnail ? "border-red-500" : "border-border"
            } rounded-md text-text bg-background shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.thumbnail && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loading /> : id ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
