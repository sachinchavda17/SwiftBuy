import Products from "../../Products/Products";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="related-products">
      <Products headingText={"Related Products"} products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
