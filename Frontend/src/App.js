import "./App.css";
import 'primeicons/primeicons.css';

import Master from "./Layout/Master";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import About from "./Pages/About";
import Service from "./Pages/Service";

import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Team from "./Pages/Team";
import Testimonial from "./Pages/Testimonial";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Paymentform from "./Pages/PaymentForm/Paymentform";
import OrderTrack from "./Pages/OrderTracking/OrderTrack";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Checkout from "./Pages/CheckOut/Checkout";
import UserMaster from "./User/Layout/UserMaster";
import UserDashboard from "./User/Pages/Dashboard";
import Profile from "./Pages/Profile/Profile";
import ManageMyOrder from "./User/Pages/MyOrder/ManageOrder";
import Myorder from "./User/Pages/MyOrder/Myorder";
import UpdateMyOrder from "./User/Pages/MyOrder/UpdateMyOrder";
import Order from "./Pages/Order/SingleOrder";
import { useState } from "react";
import ManageCart from "./Admin/Pages/ManageCart";
import ManageOrder from "./Admin/Pages/Order/ManageOrder";
import UpdateUser from "./Admin/Pages/Create_user/Updateuser";
import Contacts from "./Components/Contacts-page";
import ManageContacts from "./Admin/Pages/ManageContacts";
import ManageReview from "./Admin/Pages/ManageReview";
import ManageProduct from "./Admin/Pages/product/Productlist";
import ManageUser from "./Admin/Pages/Create_user/Manage_user";
import Updateproduct from "./Admin/Pages/product/Update_product";
import Crousel from "./Components/Crousel";
import Tab from "./Components/Tab";
import Addproduct from "./Admin/Pages/product/Add_product";
import Create_user from "./Admin/Pages/Create_user/Create_user";
import AddBanner from "./Components/Addbanner";
import CardPage from "./Components/Card-page";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminMaster from "./Admin/Layout/AdminMaster";
import UpdateOrder from "./Admin/Pages/Order/UpdateOrder";
function App() {
    const [isActive, setIsActive] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Product />} />
            <Route path="/order-track/:_id" element={<OrderTrack />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/Testmonial" element={<Testimonial />} />
            <Route path="/single-product/:_id" element={<SingleProduct />} />
            <Route path="/payment-form" element={<Paymentform />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/check-out" element={<Checkout />} />
            <Route path="*" element={<Error />} />
            <Route path="/single-order/:_id" element={<Order />} />
            {/* <Route path="blogs" element={<Blogs />} /> */}
          </Route>
          <Route
            path="/user"
            element={
              <UserMaster isActive={isActive} setIsActive={setIsActive} />
            }
          >
            <Route
              path="/user"
              element={
                <UserDashboard isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/user/profile"
              element={
                <Profile isActive={isActive} setIsActive={setIsActive} />
              }
            />

            <Route
              path="/user/my-order"
              element={
                <ManageMyOrder isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/user/my-ordermanage"
              element={
                <Myorder isActive={isActive} setIsActive={setIsActive} />
              }
            />

            <Route
              path="/user/update-user-order/:_id"
              element={
                <UpdateMyOrder isActive={isActive} setIsActive={setIsActive} />
              }
            />
          </Route>
          <Route
            path="/"
            element={
              <AdminMaster isActive={isActive} setIsActive={setIsActive} />
            }
          >
            <Route
              path="/admin"
              element={
                <AdminDashboard isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/card-page"
              element={
                <CardPage isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/Addbanner"
              element={
                <AddBanner isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/create-user"
              element={
                <Create_user isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/create-product"
              element={
                <Addproduct isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/tab"
              element={<Tab isActive={isActive} setIsActive={setIsActive} />}
            />
            <Route
              path="/admin/crousel"
              element={
                <Crousel isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/update-product/:_id"
              element={
                <Updateproduct isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/manage-user"
              element={
                <ManageUser isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/manage-product"
              element={
                <ManageProduct isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/manage-review"
              element={
                <ManageReview isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/manage-contact"
              element={
                <ManageContacts isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/error"
              element={<Error isActive={isActive} setIsActive={setIsActive} />}
            />
            <Route
              path="/admin/contact"
              element={
                <Contacts isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/update-user/:_id"
              element={
                <UpdateUser isActive={isActive} setIsActive={setIsActive} />
              }
            />

            <Route
              path="/admin/manage-order"
              element={
                <ManageOrder isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/manage-cart"
              element={
                <ManageCart isActive={isActive} setIsActive={setIsActive} />
              }
            />
            <Route
              path="/admin/update-order/:_id"
              element={
                <UpdateOrder isActive={isActive} setIsActive={setIsActive} />
              }
            />
            {/* <Route path="contact" element={<Contacts isActive={isActive} setIsActive={setIsActive} />} />
      <Route path="update-user/:_id" element={<UpdateUser isActive={isActive} setIsActive={setIsActive} />} /> 
      <Route path="add-testimonial" element={<Addtestimonial isActive={isActive} setIsActive={setIsActive} />} />
      <Route path="testimonial-list" element={<Testimoniallist isActive={isActive} setIsActive={setIsActive} />} />
      <Route path="update-testimonial/:_id" element={<Updatetestimonial isActive={isActive} setIsActive={setIsActive} />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;