import Product from "./Product/Product";
import "./Products.scss";
const Products = ({ innerPage, headingText, products,update }) => {
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products?.map((item) => (
          <Product key={item?._id} id={item?._id} data={item} update={update} />
        ))}
      </div>
    </div>
  );
};

export default Products;
