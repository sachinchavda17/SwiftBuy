import Category from "./Category/Category";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import "./Home.scss";
import { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import toast from "react-hot-toast";
import CategorySkeleton from "../skeletons/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton";
const Home = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

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

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          {loadingCategories ? (
            <CategorySkeleton />
          ) : (
            <Category categories={categories} />
          )}
          {loadingProducts ? (
            <ProductSkeleton />
          ) : (
            <Products headingText={"Popular Products"} products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
