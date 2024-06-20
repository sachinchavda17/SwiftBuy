import "./Header.scss";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import ThemeToggle from "../toggleTheme/ThemeToggle";
import Cookies from "js-cookie";
const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount } = useContext(Context);
  const { user, isAdmin, setUser, setIsAdmin, setIsLogin } = useContext(Context);

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
    Cookies.remove("swiftbuyToken")
    localStorage.clear("swiftbuyUser")
    setIsAdmin(false)
    setIsLogin(false)
    setUser(null)
  }

  return (
    <>
      <header className={`main-header ${scroll ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            {/* <li>About</li> */}
            {/* <li>Categories</li> */}
            {!user ? <li onClick={() => navigate("/login")}>Login</li> : <li onClick={handleLogout}>Logout</li>}
            {isAdmin && <li onClick={() => navigate("/admin")}>Admin</li>}
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            SwiftBuy
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            {!isAdmin && <AiOutlineHeart />}
            {!isAdmin && (
              <span className="cart-icon" onClick={() => setShowCart(true)}>
                <CgShoppingCart />
                {!!cartCount && <span>{cartCount}</span>}
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
