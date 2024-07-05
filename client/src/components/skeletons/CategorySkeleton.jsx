import React from "react";

const CategorySkeleton = ({ length = 4 }) => {
  return (
    <div className="flex my-9 flex-wrap gap-4 ">
      {[...Array(length)].map((_, idx) => (
        <div
          className="h-28 w-[calc(50%-10px)] md:w-[calc(25%-20px)] p-1 bg-slate-700 animate-pulse"
          key={idx}
        />
      ))}
    </div>  
  );
};

export default CategorySkeleton;
