import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <div className="mt-10 ">
      <span
        onClick={onClick}
        className=" cursor-pointer px-5 py-3 rounded-lg text-white hover:text-gray-200 bg-primary dark:bg-primary hover:bg-secondary "
      >
        <span className="mr-2 text-xl">+</span> <span>{title}</span>
      </span>
    </div>
  );
};

export default Button;
