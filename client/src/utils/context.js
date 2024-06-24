import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["swiftbuyToken"]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("swiftbuyUser"));
    if (cookies?.swiftbuyToken) {
      setIsLogin(true);
      setUser(storedUser);
    }
    if (storedUser?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);


  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    // cartItems.map((item)=>subTotal += item.price * item.quantity)
    cartItems.forEach((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p._id === product?._id);
    if (index !== -1) {
      items[index].quantity += quantity;
    } else {
      product.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p._id !== product._id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p._id === product._id);
    if (type === "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const descrementQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      else return prevState - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        isLogin,
        setIsLogin,
        incrementQuantity,
        descrementQuantity,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
