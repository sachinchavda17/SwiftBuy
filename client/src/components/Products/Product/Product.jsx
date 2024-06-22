import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
const Product = ({ id, data, update }) => {
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      onClick={() =>
        update
          ? navigate(`/admin/update-product/${id}`)
          : navigate(`/product/${id}`)
      }
    >
      <div className="thumnail">
        <img src={data?.img} alt="products img" />
      </div>
      <div className="prod-details">
        <span className="name">{data?.title}</span>
        <span className="price">&#8377; {data?.price}</span>
      </div>
      {update && (
        <div className="edit-cta">
          <FiEdit />
          <span>Edit Product</span>
        </div>
      )}
    </div>
  );
};

export default Product;
