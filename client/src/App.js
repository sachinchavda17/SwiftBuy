import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Category from "./components/Category/Category";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Checkout from "./components/Checkout/Checkout";
import { Context } from "./utils/context";
import { useCookies } from "react-cookie";
import AdminHome from "./components/Admin/AdminHome";
import PaymentConfirmation from "./components/Checkout/PaymentConfirmation";
import PaymentCancel from "./components/Checkout/PaymentCancel";

const App = () => {
  const { isAdmin, isLogin } = useContext(Context);

  const [cookies] = useCookies(["swiftbuyToken"]);
  return (
    <BrowserRouter>
      <Toaster />
      {!cookies.swiftbuyToken ? (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Routes>
        </>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/check" element={<Checkout />} />
            <Route path="/success" element={<PaymentConfirmation />} />
            <Route path="/cancel" element={<PaymentCancel />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
          <Newsletter />
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;

const Location = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return { children };
};
