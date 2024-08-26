import { useParams, useNavigate } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect, useState } from "react";
import ProductSkeleton from "../skeletons/ProductSkeleton";

const Category = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all categories
    const fetchCategories = async () => {
      try {
        const response = await fetchDataFromApi(`/api/categories/getallcategories`);
        setCategories(response.categories); // Assume your API returns an array of categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch products of the selected category
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetchDataFromApi(
          `/api/categories/getcategory/` + id
        );
        setData(response.category);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleCategoryChange = (e) => {
    navigate(`/category/${e.target.value}`); // Navigate to the new category page
  };

  const products = data?.products;
  console.log(products);

  return (
    <div className="category-main-content">
      <div className="layout">
        <select
          className="category-select"
          value={id}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id} >
              {category.title}
            </option>
          ))}
        </select>

        {loading ? (
          <ProductSkeleton length={8} />
        ) : (
          <>
            <div className="category-title">{data?.title}</div>
            {products?.length === 0 ? (
              <h1 className="no-product">No Product Available !!!</h1>
            ) : (
              <Products innerPage={true} products={products} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
