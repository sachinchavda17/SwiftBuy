import React from "react";

const ItemSkeleton = ({length=4}) => {
  return (
    <div className="w-full">
      {[...Array(length)].map((_, idx) => (
        <div
          className=" shadow rounded-md p-4 md:w-[calc(100%-20px)]  mx-auto"
          key={idx}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded bg-slate-700 h-14 w-14"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemSkeleton;
