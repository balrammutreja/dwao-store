import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Home.module.scss";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/Section-titile/SectionTitle";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
import { selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";


const Home = ({ myTheme }) => {
  const products = useFetchCollection('products');
  const userId = useSelector(selectUserID);
  const loggedin = useSelector(selectIsLoggedIn);


  useEffect(()=>{
    adobeDatalayerLogin();
    adobeDatalayerRegister();
  },[]);

  const adobeDatalayerLogin = ()=>{

    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
    "event":"HomeAfterLogin",
    eventInfo:{
    eventName:"load"
    },
    page: {
    linkName: "Home",
    channel: "Home",
    // for page name pass name of the page from which user clicks
    linkPageName:"Home",
    // pass name of the page from which user clicks
     }, 
    user: {
    customerID : userId, 
     // only pass when available
    loginStatus : loggedin ? "LoggerdIn" : "guest" ,
    platform:   "Desktop",
    // // pass only when user has logged in
    // dob: "<date of birth>"
    // // pass only when user is logged in
    }
    
    });
  
  }

  const adobeDatalayerRegister = ()=>{



    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
    "event":"HomeAfterSignup",
    eventInfo:{
    eventName:"load"
    },
    page: {
    linkName: "Home",
    channel: "Home",
    // for page name pass name of the page from which user clicks
    linkPageName:"Home",
    // pass name of the page from which user clicks
     }, 
    user: {
    customerID : userId, 
     // only pass when available
    loginStatus : loggedin ? "LoggerdIn" : "guest" ,
    platform:   "Desktop",
    // // pass only when user has logged in
    // dob: "<date of birth>"
    // // pass only when user is logged in
    }
    
    });
  
  }


  const updateAdobeLayer = ()=>{
    window.adobeDataLayer = window.adobeDataLayer || [];
      window.adobeDataLayer.push({
      "event":"home Load",
      eventInfo:{
      eventName:"homeLoad"
      },
      page: {
      pageName: "homepage",
      },
      user: {
      loginStatus: "loggedin",
      }
      });

  
  }



  

  return (
    <>
    <div className={styles.home} data-theme={myTheme} onLoad={updateAdobeLayer} >

      <Slider />
      {/* <Product theme={myTheme}/> */}

      <div className="support-area pt-100 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="support-wrap mb-30">
                <div className="support-icon">
                  <img className="animated" src={require('../../assets/icon-img/support-1.png')} alt="" />
                </div>
                <div className="support-content">
                  <h5>Free Shipping</h5>
                  <p>Free shipping on all order</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="support-wrap mb-30">
                <div className="support-icon">
                  <img className="animated" src={require('../../assets/icon-img/support-2.png')} alt="" />
                </div>
                <div className="support-content">
                  <h5>Support 24/7</h5>
                  <p>Free shipping on all order</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="support-wrap mb-30">
                <div className="support-icon">
                  <img className="animated" src={require('../../assets/icon-img/support-3.png')} alt="" />
                </div>
                <div className="support-content">
                  <h5>Money Return</h5>
                  <p>Free shipping on all order</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="support-wrap mb-30">
                <div className="support-icon">
                  <img className="animated" src={require('../../assets/icon-img/support-4.png')} alt="" /></div>
                <div className="support-content"><h5>Order Discount</h5><p>Free shipping on all order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
      <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
               <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
            <div className="row" style={{width: '90%',marginLeft: 'auto',marginRight: 'auto'}}>
               <ProductGrid products={products} />
               </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row" style={{width: '90%',marginLeft: 'auto',marginRight: 'auto'}}>
             
              <ProductGrid products={products} />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row" style={{width: '90%',marginLeft: 'auto',marginRight: 'auto'}}>
             
              <ProductGrid products={products} />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
    
    



      {/* <Category /> */}

{/*  
      <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Recent view product</h2>
      <div className={styles.product1}> */}

        {
          // products.data ? products.data.map((pro) => (
          //   <Card cardClass={`${styles.grid}`} >
          //     <Link to={`/product-details/${pro.id}`}>
          //       <div className={styles.img}>
          //         <img src={pro.imageURL} alt={pro.name} />
          //       </div>
          //     </Link>
          //     <div className={styles.content}>
          //       <div className={styles.details}>
          //         <p>{`$${pro.price}`}</p>
          //         <h4>{shortenText(pro.name, 18)}</h4>
          //       </div>
          //       {/* <p className={styles.desc}>{shortenText(pro.desc, 200)}</p> */}

          //       {/* <button
          //       className="--btn --btn-danger"
          //       // onClick={() => addToCart(product)}
          //     >
          //       Add To Cart
          //     </button> */}
          //     </div>
          //   </Card>
          // )) : <p>No product found</p>
        }




      {/* </div> */}



        






    </div>
    </>
  );
};

export default Home;
