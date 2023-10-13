import styles from "./ProductDetails.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { Breadcrumb, Nav, Tab } from "react-bootstrap";
import { selectIsLoggedIn } from "../../../redux/slice/authSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const products = useFetchCollection("products");
  const filteredReviews = data.filter((review) => review.productID === id);
  const [color,setColor] = useState("");
  const loggedin = useSelector(selectIsLoggedIn);


  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const val = 0;


  useEffect(()=>{
    adobeDataLayer();
  },[loggedin,product]);

  const adobeDataLayer = ()=>{

    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
    "event":"PDP load",
    eventInfo:{
    eventName:"PDP load"
    },
    page: {
    pageName: "PDP",
    },
    product:{
    productSKU: product ? product.id : "",
    productName:product ? product.name : "",
    price:product ? product.price: "",
    },
    user: {
    loginStatus: loggedin ? "LoggedIn" : "guest",
    }
    });
    


  }

  const adobeDataLayerAddtoCart = (item)=>{

window.adobeDataLayer = window.adobeDataLayer || [];
window.adobeDataLayer.push({
"event":"add to cart",
eventInfo:{
eventName:"add to cart"
},
click:{
linkName:item.name,
linkPageName: "PDP"
},
product:{
productSKU:item.id,
productName:item.name,
price:item.price,
 },
 user: {
loginStatus: loggedin ? "LoggedIn" : "guest",
}
});



  }



  return (

    <>
    
    <section>
      <div className={`container ${styles.product}`}>
        
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>

            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <hr/>
                <h4>Select Colors</h4>

            <div style={{display:"flex", gap:"10px"}}>
                <div className={styles.colordiv}>
                <div className={styles.color} style={{backgroundColor: product.colorVariant}} onClick={()=>{setColor(product.colorVariant)}}></div>
                
                </div>

                <div className={styles.colordiv}>
                <div className={styles.color} style={{backgroundColor: product.colorVariant1}} onClick={()=>{setColor(product.colorVariant1)}}></div>
                
                </div>

                <div className={styles.colordiv}>
                <div className={styles.color} style={{backgroundColor: product.colorVariant2}} onClick={()=>{setColor(product.colorVariant2)}}></div>
                
                </div>  
            </div>   
              
                <hr/>
              

                





              <div class="product-details-content">
                <div class="pro-details-quality">
                <div class="cart-plus-minus">
                <button class="dec qtybutton" onClick={() => decreaseCart(product)}>-</button>
                <input class="cart-plus-minus-box" type="text" readonly="" value={cart !== undefined ? cart.cartQuantity : val}/>
                <button class="inc qtybutton" onClick={() => addToCart(product)}>+</button>
                </div>
                  <div class="pro-details-cart btn-hover" onClick={adobeDataLayerAddtoCart(product)}>
                    <button  onClick={() => addToCart(product)}> Add To Cart </button></div>
                  </div>
               </div>





              </div>
            </div>
          </>
        )}

        
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>



      <h2 style={{textAlign:'center',marginTop:'50px'}}>Recommended product for you</h2>          
      <div className={styles.recommended}>          
      {
          products.data ? products.data.map((pro)=>(
            <Card cardClass={`${styles.grid}`} >
            <a href={`/product-details/${pro.id}`} >
              <div className={styles.img}>
                <img src={pro.imageURL} alt={pro.name} />
              </div>
            </a>
            <div className={styles.content}>
              <div className={styles.details}>
                <p>{`$${pro.price}`}</p>
                <h4>{shortenText(pro.name, 18)}</h4>
              </div>
               {/* <p className={styles.desc}>{shortenText(pro.desc, 200)}</p> */}

              {/* <button
                className="--btn --btn-danger"
                // onClick={() => addToCart(product)}
              >
                Add To Cart
              </button> */}
            </div>
          </Card>
            )) : <p>No product found</p>
        }           
    </div>

    </section>

    
    </>
  );
};

export default ProductDetails;
