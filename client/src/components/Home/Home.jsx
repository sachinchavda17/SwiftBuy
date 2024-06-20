import Category from "./Category/Category";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import "./Home.scss";
import { useContext, useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);
  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
  const getCategory = () => {
    fetchDataFromApi("/api/categories/getallcategories").then((res) => {
      console.log(res);
      setCategories(res.categories);
    });
  };
  const getProducts = () => {
    fetchDataFromApi("/api/products/getallproducts").then((res) => {
      console.log(res);
      setProducts(res.products);
    });
  };
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products headingText={"Popular Products"} products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
