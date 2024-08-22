import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <span
      onClick={toggleTheme}
      className="flex gap-x-5 px-4 py-2  cursor-pointer text-sm"
    >
      <span className="">
        {theme === "light" ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
      </span>
      <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
    </span>
  );
};

export default ThemeToggle;
