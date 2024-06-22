import "../Header/Header.scss";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../toggleTheme/ThemeToggle";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

const AdminHeader = () => {
  const [scroll, setScroll] = useState(false);
  const [cookies] = useCookies(["swiftbuyToken"]);

  const navigate = useNavigate();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove("swiftbuyToken");
    localStorage.clear("swiftbuyUser");
  };

  return (
    <>
      <header className={`main-header ${scroll ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>User</li>
            <li onClick={() => navigate("/admin")}>Home</li>
            <li onClick={() => navigate("/admin/add-category")}>
              Add Category
            </li>
            <li onClick={() => navigate("/admin/add-product")}>Add Product</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            SwiftBuy
          </div>
          <div className="right">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
