import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
// Components

import useLocalStorage from "use-local-storage";
import { Suspense, lazy, useEffect, useState } from "react";
import { collection,query,orderBy,onSnapshot,where, doc } from "firebase/firestore";
import { db } from "./firebase/config";
import { toast } from "react-toastify";
import { STORE_THEME, selectThemes } from "./redux/slice/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import {Header,Footer} from "./components";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Cart = lazy(()=>import("./pages/cart/Cart"));
const CheckoutDetails = lazy(()=>import("./pages/checkout/CheckoutDetails"));
const Checkout = lazy(()=>import("./pages/checkout/Checkout"));
const CheckoutSuccess = lazy(()=>import("./pages/checkout/CheckoutSuccess"));
const OrderHistory = lazy(()=>import("./pages/orderHistory/OrderHistory"));
const OrderDetails = lazy(()=>import("./pages/orderDetails/OrderDetails"));
const NotFound = lazy(()=>import("./pages/notFound/NotFound"));
const Shop = lazy(()=>import("./pages/Shop/Shop"));
const CategoryProduct = lazy(()=>import("./pages/Category_Product/CategoryProducts"));



function App() {

  const initialState = {
    body_color: "",
    button_color: "",
    footer_color: "",
    header_color: "",
    text_color:"",
    text_hover_color:"",
    theme_name:""

  };

  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [dTheme, setDTheme] = useState([]);
  const [title,setTitle] = useState("");


  const dispatch = useDispatch();
  const curruntTheme = useSelector(selectThemes);



  const themeChange = (data)=>{
    setTheme(data);
  }


  useEffect(()=>{
     document.title = "balram"; 
    change_theme();
    
  },[]);

  

const change_theme = ()=>{


  try {
    const logoRef = collection(db, "Themes");
    const q = query(logoRef, where("status", "==", "active"));
    onSnapshot(q, (querySnapshot) => {
     const allthemes = querySnapshot.docs.map((doc)=>({
      id: doc.id,
      ...doc.data()
     }));
  
     setDTheme(allthemes);
     dispatch(STORE_THEME(allthemes));
    });

    
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }


}

if(curruntTheme){

  curruntTheme.map((ele)=>(
    
    document.documentElement.style.setProperty('--theme-color', ele.theme_color),
    document.documentElement.style.setProperty('--slider-color', ele.slider_color),
    document.documentElement.style.setProperty('--header-color', ele.headerColor),
    document.documentElement.style.setProperty('--footer-color', ele.footerColor),
    document.documentElement.style.setProperty('--body-color', ele.bodyColor),
    document.documentElement.style.setProperty('--forground', ele.forground),
    document.documentElement.style.setProperty('--hover', ele.hover)
    // document.documentElement.style.setProperty('--active', ele.active),
    // document.documentElement.style.setProperty('--btn-danger', ele.btnDanger),
    // document.documentElement.style.setProperty('--btn-sucess', ele.btnSucess),
    // document.documentElement.style.setProperty('--btn-primary', ele.btnPrimary),
    // document.documentElement.style.setProperty('--brand-color', ele.brandColor)
  ))
}

  




console.log()

  return (
    <>
    <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
      <BrowserRouter basename={process.env.REACT_APP_DIR}>
        
        <ToastContainer />
        <Header  changetheme={themeChange} myTheme={theme}/>
        <Routes>
          <Route path="/" element={<Home myTheme={theme}/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/shop" element={<Shop myTheme={theme}/>} />
          <Route path="/shop/:cat" element={<CategoryProduct />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer  myTheme={theme}/>
        <ScrollToTop/>
      </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
