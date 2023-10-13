import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import styles from  "./Shop.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_CATEGORY } from "../../redux/slice/filterSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import BreadcrumbWrap from "../../components/Breadcrumb/Breadcrumb";
const Shop = ({myTheme}) => {
  const url = window.location.href;

    const {id} = useParams();

  return (
<>
<BreadcrumbWrap  pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop", path: '/shop' }
          ]} 
        />

    <div className={styles.shop} data-theme={myTheme}>
      <Product id={id}/>

    </div>
    </>
  );
};

export default Shop;
