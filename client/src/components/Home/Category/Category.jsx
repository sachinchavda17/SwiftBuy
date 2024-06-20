import "./Category.scss";
import Cat1 from "../../../assets/category/cat-1.jpg";
import { useNavigate } from "react-router-dom";
const Category = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories?.map((item) => (
          <div
            key={item._id}
            className="category"
            onClick={() => navigate(`/category/${item._id}`)}
          >
            <img src={item?.thumbnail} alt="categories img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
