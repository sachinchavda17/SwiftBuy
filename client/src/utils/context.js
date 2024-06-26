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
    console.log(cartItems);
    // cartItems.map((item)=>subTotal += item.price * item.quantity)
    cartItems.forEach(
      (item) => (subTotal += item.product.price * item.quantity)
    );
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = async (product, quantity) => {
    try {
      const response = await fetchDataPost(`/api/carts/add-cart/${user._id}`, {
        pId: product._id,
        quantity,
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

  const handleRemoveFromCart = async (product) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_DEV_URL}/api/carts/remove-cart/${user._id}/${product._id}`
      );

      if (response.status === 200 && response.data.success) {
        let items = [...cartItems];
        items = items.filter((p) => p.product._id !== product._id);
        setCartItems(items);
        toast.success("Item successfully removed from cart");
      } else {
        toast.error(
          response?.data?.error || "Failed to remove item from cart!"
        );
        console.error(
          "Failed to remove item from cart:",
          response?.data?.error
        );
      }
    } catch (err) {
      toast.error("Error in removing item from cart");
      console.error("Error in removing item from cart:", err.message);
    }
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.product._id === product.product._id);
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
