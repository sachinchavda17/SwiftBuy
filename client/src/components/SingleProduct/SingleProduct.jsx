import { useContext, useState } from "react";

import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Context } from "../../utils/context";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/products/getproduct/${id}`);
  const {
    handleAddToCart,
    quantity,
    setQuantity,
    descrementQuantity,
    incrementQuantity,
  } = useContext(Context);

  if (!data) return null;
  const product = data?.product;
  console.log(data.relatedProducts);

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={product?.img} alt="" />
          </div>
          <div className="right">
            <span className="name">{product?.title}</span>
            <span className="price">&#8377; {product?.price}</span>
            <span className="desc">{product?.desc}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={descrementQuantity}>-</span>
                <span>{quantity}</span>
                <span onClick={incrementQuantity}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(product, quantity);
                  setQuantity(1);
                  toast.success("Item added to cart ");
                }}
              >
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <div className="text-bolds">
                Category : <span>{product?.category?.title}</span>
              </div>
              <div className="text-bolds">
                Share :
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </div>
            </div>
          </div>
        </div>
        {!!data.relatedProducts && (
          <RelatedProducts data={data.relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
