// import React from "react";
// import { Toaster } from "react-hot-toast";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home/Home";
// import SingleProduct from "./components/SingleProduct/SingleProduct";
// import Category from "./components/Category/Category";
// import Header from "./components/Header/Header";
// import Newsletter from "./components/Footer/Newsletter/Newsletter";
// import Footer from "./components/Footer/Footer";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import Checkout from "./components/Checkout/Checkout";
// import { useCookies } from "react-cookie";
// import AdminHome from "./components/Admin/AdminHome";
// import PaymentConfirmation from "./components/Checkout/PaymentConfirmation";
// import PaymentCancel from "./components/Checkout/PaymentCancel";
// import ScrollToTop from "./utils/ScrollToTop";
// import AdminHeader from "./components/Header/AdminHeader";
// import AddCategory from "./components/Admin/AddCategory";
// import AddProduct from "./components/Admin/AddProduct";
// import UserProfile from "./components/User/UserProfile";
// import Order from "./components/User/Order";

// const App = () => {
//   const [cookies] = useCookies(["swiftbuyToken"]);

//   return (
//     <BrowserRouter>
//       <Toaster />
//       <ScrollToTop>
//         {!cookies.swiftbuyToken ? (
//           <Routes>
//             <Route path="/*" element={LogedOutUserRoute()} />
//           </Routes>
//         ) : (
//           <Routes>
//             <Route path="/*" element={LogedInUserRoute()} />
//             <Route path="/admin/*" element={AdminRoute()} />
//           </Routes>
//         )}
//       </ScrollToTop>
//     </BrowserRouter>
//   );
// };

// export default App;

// const AdminRoute = () => {
//   return (
//     <>
//       <AdminHeader />
//       <Routes>
//         <Route path="/" element={<AdminHome />} />
//         <Route path="/add-category" element={<AddCategory />} />
//         <Route path="/add-category/:id" element={<AddCategory />} />
//         <Route path="/add-product" element={<AddProduct />} />
//         <Route path="/update-product/:id" element={<AddProduct />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// };

// const AuthRoute = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// };
// const LogedOutUserRoute = () => {
//   return (
//     <>
//       <>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product/:id" element={<SingleProduct />} />
//           <Route path="/category/:id" element={<Category />} />
//         </Routes>
//         <Newsletter />
//         <Footer />
//       </>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//       <Routes>
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// };
// const LogedInUserRoute = () => {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/product/:id" element={<SingleProduct />} />
//         <Route path="/category/:id" element={<Category />} />
//         <Route path="/check" element={<Checkout />} />
//         <Route path="/success" element={<PaymentConfirmation />} />
//         <Route path="/cancel" element={<PaymentCancel />} />
//         <Route path="/my-profile" element={<UserProfile />} />
//         <Route path="/my-orders" element={<Order />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//       <Newsletter />
//       <Footer />
//     </>
//   );
// };

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
import UserProfile from "./components/User/UserProfile";
import Order from "./components/User/Order";
import ProductList from "./components/Admin/ProductList";
import OrderManagement from "./components/Admin/OrderManagement";
import UserManagement from "./components/Admin/UserManagement";

const App = () => {
  const [cookies] = useCookies(["swiftbuyToken"]);
  const isLoggedIn = !!cookies.swiftbuyToken;

  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/*" element={<LoggedOutUserRoute />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<LoggedInUserRoute />} />
              <Route path="/admin/*" element={<AdminRoute />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;

const LoggedOutUserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
};

const LoggedInUserRoute = () => {
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
        <Route path="/my-profile" element={<UserProfile />} />
        <Route path="/my-orders" element={<Order />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
};

const AdminRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/edit" element={<AdminHome />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-category/:id" element={<AddCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<AddProduct />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/order-manage" element={<OrderManagement />} />
        <Route path="/user-manage" element={<UserManagement />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};