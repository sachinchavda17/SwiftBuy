import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Simulated API call
      const data = await fetchDataFromApi("/api/products/getallproducts");
      setProducts(data.products || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className=" text-gray-800 text-left border-b-2 border-border">
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6 max-w-8">Product Name</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Discount %</th>
              <th className="py-3 px-6">Stock</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="py-3 px-6 h-4 w-4"><img src={product.img} alt={product.title} /></td>
                <td className="py-3 px-6  max-w-48">{product.title}</td>
                <td className="py-3 px-6">{product.category.title}</td>
                <td className="py-3 px-6">₹{product.price}</td>
                <td className="py-3 px-6">{product.discountPercentage} %</td>
                <td className="py-3 px-6">{product.stock}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg shadow hover:bg-red-600 transition duration-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
