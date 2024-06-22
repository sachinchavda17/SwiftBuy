import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { CgShoppingCart } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Cart from '../Cart/Cart';
import Search from './Search/Search';
import ThemeToggle from '../toggleTheme/ThemeToggle';
import { Context } from '../../utils/context';
import './Header.scss';

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { cartCount } = useContext(Context);
  const { user, isAdmin, setUser, setIsAdmin, setIsLogin } = useContext(Context);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    setScroll(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove('swiftbuyToken');
    localStorage.clear('swiftbuyUser');
    setIsAdmin(false);
    setIsLogin(false);
    setUser(null);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <header className={`main-header ${scroll ? 'sticky-header' : ''}`}>
        <div className="header-content">
          <div className="left">
            <span className="hamburger" onClick={handleSidebarToggle}>
              {showSidebar ? <FaTimes /> : <GiHamburgerMenu />}
            </span>
            <ul className={`menu ${showSidebar ? 'open' : ''}`}>
              <li onClick={() => navigate('/')}>Home</li>
              {!user ? (
                <li onClick={() => navigate('/login')}>Login</li>
              ) : (
                <li onClick={handleLogout}>Logout</li>
              )}
              {isAdmin && <li onClick={() => navigate('/admin')}>Admin</li>}
            </ul>
          </div>
          <div className="center" onClick={() => navigate('/')}>
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
