import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-6 md:mx-auto rounded-lg shadow-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm7.707,16.293L16.414,19.5,12,15.086,7.586,19.5,4.293,16.293,8.707,12,4.293,7.586,7.586,4.293,12,8.707l4.414-4.414,3.293,3.293,3.293-3.293L19.5,7.586,15.086,12Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
            Order Cancelled
          </h3>
          <p className="text-gray-600 my-2">Your order has been cancelled.</p>
          <p className="text-gray-600 my-2">We hope to see you again soon!</p>
          <div className="py-6 text-center">
            <Link
              to="/"
              className="px-8 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-md inline-block"
            >
              GO BACK TO HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
