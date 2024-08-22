import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating,className }) => {
  const ratingCount = rating || 0; // Default to 0 if no rating
  const fullStars = Math.floor(ratingCount); // Number of full stars
  const hasHalfStar = ratingCount - fullStars >= 0.5; // Check if there's a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  return (
    <>
      <div className={`${className}  `}>
        {Array(fullStars)
          .fill(<FaStar className="text-primary" />)
          .map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        {hasHalfStar && <FaStarHalfAlt className="text-primary" />}
        {Array(emptyStars)
          .fill(<FaRegStar className="empty-star text-gray-800" />)
          .map((star, index) => (
            <span key={index}>{star}</span>
          ))}
      </div>
    </>
  );
};

export default Rating;
