import "./SingleProduct.scss";
import { useContext, useState, useEffect } from "react";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import toast from "react-hot-toast";
import SingleProductSkeleton from "../skeletons/SingleProductSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import Rating from "../common/Rating";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    handleAddToCart,
    quantity,
    setQuantity,
    decrementQuantity,
    incrementQuantity,
    cookies,
  } = useContext(Context);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchDataFromApi(
          `/api/products/getproduct/${id}`
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading || !data) {
    return (
      <div className="single-product-main-content">
        <div className="layout">
          <SingleProductSkeleton />;
          <ProductSkeleton length={4} />
        </div>
      </div>
    );
  }

  const product = data.product;
  const relatedProducts = data.relatedProducts;

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={product?.img} alt={product.title} />
          </div>
          <div className="right">
            <span className="name">{product.title}</span>
            <div className="price-sec">
              <span className="price">&#8377; {product?.price}</span>
              <span className="discount-price">
                &#8377; {(product?.discountPercentage * product?.price) / 100}
              </span>
            </div>
            <span className="desc">{product.desc}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrementQuantity}>-</span>
                <span>{quantity}</span>
                <span onClick={incrementQuantity}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  if (cookies?.swiftbuyToken) {
                    handleAddToCart(product, quantity);
                    setQuantity(1);
                  } else {
                    toast.error("Login to add item in cart.");
                  }
                }}
              >
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <div className="text-bolds">
                Category : <span>{product.category.title}</span>
              </div>
              {/* <div className="text-bolds">
                Share :
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </div> */}
              <div className="flex gap-3 text-bold">
                Rating :
                <Rating rating={product.rating} className={"flex gap-2"} />
              </div>
            </div>
            <div className="stock">
              Stock : {product.stock > 0 ? "In Stock " : "Out of Stock"}
              {/* {product.stock} */}
            </div>
          </div>
        </div>
        {relatedProducts && (
          <RelatedProducts relatedProducts={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
