import React from 'react';

const CategorySkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full sm:w-[calc(50%-5px)]  p-4 overflow-hidden">
      <div className="h-36 w-full bg-slate-700 animate-pulse"></div>
    </div>
  );
};

export default CategorySkeleton;
