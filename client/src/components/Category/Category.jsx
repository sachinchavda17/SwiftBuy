import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect, useState } from "react";
import ProductSkeleton from "../skeletons/ProductSkeleton";

const Category = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchDataFromApi(
          `/api/categories/getcategory/` + id
        );
        setData(response.category);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(true);
      }
    };

    fetchCategory();
  }, [id]);

  const products = data?.products;

  return (
    <div className="category-main-content">
      <div className="layout">
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
