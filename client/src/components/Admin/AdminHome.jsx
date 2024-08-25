import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import Banner from "../Home/Banner/Banner";
import HomeCategory from "../Home/HomeCategory/HomeCategory";
import { Context } from "../../utils/context";
import { fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import CategorySkeleton from "../skeletons/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import Products from "../Products/Products";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const AdminHome = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const navigate = useNavigate();

  const getCategory = () => {
    fetchDataFromApi("/api/categories/getallcategories")
      .then((res) => {
        setCategories(res.categories);
      })
      .catch((error) => {
        toast.error("Error fetching categories:", error);
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  };

  const getProducts = () => {
    fetchDataFromApi("/api/products/getallproducts")
      .then((res) => {
        setProducts(res.products);
      })
      .catch((error) => {
        toast.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  };
  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
  return (
    <div>
      <div className="main-content">
        <div className="layout">
          {loadingCategories ? (
            <CategorySkeleton />
          ) : (
            <>
              <Button
                title={"Add New Category"}
                onClick={() => navigate("/admin/add-category")}
              />
              <HomeCategory categories={categories}  />
            </>
          )}
          {loadingProducts ? (
            <ProductSkeleton />
          ) : (
            <>
              <Button
                title={"Add New Product"}
                onClick={() => navigate("/admin/add-product")}
              />
              <Products
                headingText={"Popular Products"}
                products={products}
                update={true}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
