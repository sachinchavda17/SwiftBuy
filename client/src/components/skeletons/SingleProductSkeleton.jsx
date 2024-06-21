import React from "react";

const SingleProductSkeleton = () => {
  return (
    <div className="flex my-20 shadow flex-col w-full gap-14 md:flex-row  ">
      <div className="h-96 w-full bg-slate-700 animate-pulse"></div>
      <div className="animate-pulse flex space-x-4 items-center justify-center w-full">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-700 rounded col-span-2"></div>
              <div className="h-3 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-3 bg-slate-700 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-700 rounded col-span-1"></div>
              <div className="h-3 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div className="h-3 bg-slate-700 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-700 rounded col-span-2"></div>
              <div className="h-3 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-3 bg-slate-700 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-700 rounded col-span-1"></div>
              <div className="h-3 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div className="h-3 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
