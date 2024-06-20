import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
import useFetch from "../../hooks/useFetch";
const Category = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/categories/getcategory/` + id);
  const products = data?.category?.products;
  console.log(data?.category?.products?.length);
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">{data?.category?.title}</div>
        {products?.length === 0 ? (
          <h1 className="no-product">No Product Available !!!</h1>
        ) : (
          <Products innerPage={true} products={products} />
        )}
      </div>
    </div>
  );
};

export default Category;
