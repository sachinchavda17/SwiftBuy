// import "./Product.scss";
// import { useNavigate } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";
// const Product = ({ id, data, update }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="product-card"
//       onClick={() =>
//         update
//           ? navigate(`/admin/update-product/${id}`)
//           : navigate(`/product/${id}`)
//       }
//     >
//       <span className="rating">*****</span>
//       <div className="thumnail">
//         <img src={data?.img} alt="products img" />
//       </div>
//       <div className="prod-details">
//         <span className="name">{data?.title}</span>
//         <span className="price">&#8377; {data?.price}</span>
//       </div>
//       {update && (
//         <div className="edit-cta">
//           <FiEdit />
//           <span>Edit Product</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;

import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { GoHeartFill, GoHeart } from "react-icons/go";
import Rating from "../../common/Rating";

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
      <div className="rating">
        <Rating
          rating={data.rating}
          className={"absolute top-0 left-0 flex gap-2"}
        />
      </div>
      <div className="fav">
        <GoHeart />
      </div>
      <div className="thumnail">
        <img src={data?.img} alt="products img" />
      </div>
      <div className="prod-details">
        <span className="name">{data?.title}</span>
        <span className="price">&#8377; {data?.price}</span>
        <span className="discount-price">
          &#8377; {(data?.discountPercentage * data?.price) / 100}
        </span>
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
