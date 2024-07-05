import React from "react";

const ProductSkeleton = ({ length = 4 }) => {
  return (
    <>
      <div className="flex my-20 gap-4 flex-wrap ">
        {[...Array(length)].map((_, idx) => (
          <div
            className="shadow w-[calc(50%-10px)] md:w-[calc(25%-15px)] mx-auto p-1 "
            key={idx}
          >
            <div className="h-44  md:h-80 w-full bg-slate-700 animate-pulse"></div>
            <div className="animate-pulse flex space-x-4 mt-5">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-3 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-3 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSkeleton;
