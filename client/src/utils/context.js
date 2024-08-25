import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { fetchDataFromApi, fetchDataPost } from "./api";
import toast from "react-hot-toast";
import axios from "axios";
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
    if (cookies?.swiftbuyToken && storedUser) {
      setIsLogin(true);
      setUser(storedUser);
    }
    if (storedUser?.role === "admin" && cookies?.swiftbuyToken) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.forEach((item) => (subTotal += item?.discountedPrice));
    
    setCartSubTotal(subTotal.toFixed(2));
  }, [cartItems]);

  const handleAddToCart = async (product, quantity, discountedPrice) => {
    try {
      const response = await fetchDataPost(`/api/carts/add-cart/${user?._id}`, {
        pId: product._id,
        quantity,
        discountedPrice,
      });

      if (response && response.cart) {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.product._id === product._id);
        if (index !== -1) {
          items[index].quantity += quantity;
        } else {
          items = [...items, { ...response.cart, product }];
        }
        setCartItems(items);
        toast.success("Item added to cart");
      } else {
        toast.error(response?.response?.data?.error || "Add to cart failed!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Add to cart failed!");
    }
  };

  const handleRemoveFromCart = async (cartItem) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_DEV_URL}/api/carts/remove-cart/${user._id}/${cartItem.product._id}`
      );

      if (response.status === 200 && response.data.message) {
        let items = [...cartItems];
        items = items.filter((p) => p.product._id !== cartItem.product._id);
        setCartItems(items);
        toast.success("Item successfully removed from cart");
      } else {
        toast.error(
          response?.response?.data?.error || "Failed to remove item from cart!"
        );
        console.error(
          "Failed to remove item from cart:",
          response?.response?.data?.error
        );
      }
    } catch (err) {
      toast.error("Error in removing item from cart");
      console.error("Error in removing item from cart:", err.message);
    }
  };

  const handleCartProductQuantity = (type, cart) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.product._id === cart.product._id);
    if (type === "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < 5) {
        return prevQuantity + 1;
      } else {
        toast.error("You reached the maximum quantity!");
        return prevQuantity; // Return the current quantity if limit is reached
      }
    });
  };

  const decrementQuantity = () => {
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
        decrementQuantity,
        quantity,
        setQuantity,
        cookies,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
