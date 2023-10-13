import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Home from "../../components/admin/home/Home";
import Navbar from "../../components/admin/navbar/Navbar";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";

import styles from "./Admin.module.scss";
import Logo from "../../components/admin/Logo/Logo";
import Theme from "../../components/admin/Theme/Theme";
import ViewLogos from "../../components/admin/viewLogo/ViewLogos";
import EditTheme from "../../components/admin/Theme/EditTheme";


const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="all-logos" element={<ViewLogos />} />
          <Route path="logo/:id" element={<Logo />} />
          <Route path="theme/" element={<Theme />} />
          <Route path="theme/:id" element={<EditTheme />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
