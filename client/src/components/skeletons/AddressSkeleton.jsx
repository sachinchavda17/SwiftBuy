import React from "react";

const AddressSkeleton = ({length=4}) => {
  return (
    <div className="w-full">
      {[...Array(length)].map((_, idx) => (
        <div
          className=" shadow rounded-md p-4 md:w-[calc(100%-20px)]  mx-auto"
          key={idx}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-5 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
              </div>
                <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressSkeleton;
