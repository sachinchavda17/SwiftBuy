import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Category from "./components/Category/Category";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Checkout from "./components/Checkout/Checkout";
import { useCookies } from "react-cookie";
import AdminHome from "./components/Admin/AdminHome";
import PaymentConfirmation from "./components/Checkout/PaymentConfirmation";
import PaymentCancel from "./components/Checkout/PaymentCancel";
import ScrollToTop from "./utils/ScrollToTop";
import AdminHeader from "./components/Header/AdminHeader";
import AddCategory from "./components/Admin/AddCategory";
import AddProduct from "./components/Admin/AddProduct";

const App = () => {
  const [cookies] = useCookies(["swiftbuyToken"]);

  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop>
        {!cookies.swiftbuyToken ? (
          <Routes>
            <Route path="/*" element={AuthRoute()} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={UserRoute()} />
            <Route path="/admin/*" element={AdminRoute()} />
          </Routes>
        )}
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;

const AdminRoute = () => {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-category/:id" element={<AddCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<AddProduct />} />
      </Routes>
      <Footer />
    </>
  );
};

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const UserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/check" element={<Checkout />} />
        <Route path="/success" element={<PaymentConfirmation />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
};
