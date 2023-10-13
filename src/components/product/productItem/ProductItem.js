import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import spinnerImg from "../../../assets/spinner.jpg";
import { selectIsLoggedIn } from "../../../redux/slice/authSlice";
import { selectProducts } from "../../../redux/slice/productSlice";


const ProductItem = ({ product, grid, id, name, price, desc, imageURL ,theme,index}) => {
  const loggedin = useSelector(selectIsLoggedIn);
  const adobeProducts = useSelector(selectProducts);
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  useEffect(()=>{
    adobeDataLayer();
  },[]);



  const adobeDataLayer = ()=>{

    window.adobeDataLayer = window.adobeDataLayer || [];
      window.adobeDataLayer.push({
      "event":"PLP Load",
      eventInfo:{
      eventName:"PLP Load"
      },
      page: {
       pageName: "PLP",
       },
      product:{
      productCount:adobeProducts.length,
      productSKU:[adobeProducts.map(item=>item.id)],
      productName:[adobeProducts.map(item=>item.name)],
      productPrice:[adobeProducts.map(item=>item.price)], 
      },
      user: {
      loginStatus:loggedin ? "LoggedIn" : "guest",
      }
      });
      
       
   
  }

const adobeDataLayerClick = (pro)=>{

window.adobeDataLayer = window.adobeDataLayer || [];
window.adobeDataLayer.push({
"event":"Product click",
eventInfo:{
eventName:"Product click"
},
click:{
linkName:pro.name,
 linkPageName: "PLP"
},
 product:{
 productSKU:pro.id,
 productName:pro.name,
 price:pro.price,
},
 user: {
 loginStatus:loggedin ? "Loggedin": "guest",
 }
});

  }



  return (
    <>
    {product === null ? (
      <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
    ) : (
<div className="col-xl-3 col-md-6 col-lg-4 col-sm-6">
          <div className="product-wrap mb-25">
            <div className="product-img" onClick={()=>adobeDataLayerClick(product)}>
            <Link to={`/product-details/${id}`}>
                <img className="default-img" src={imageURL} alt=""/>
                </Link>
               
                <div className="product-img-badges">
                  <span class="pink">-10%</span>
                  </div>
                      <div className="product-action">
                 
                      <div className="pro-same-action pro-cart" style={{width:'100%'}}>
                        <button onClick={()=>addToCart(product)}>Add to cart</button>
                        </div>
                       
                          </div>
                          </div>
                          <div className="product-content text-center">
                            <h3> <Link to={`/product-details/${id}`}>{name}</Link></h3>
                             <div className="product-price"><span>${price}</span> <span className="old">€12.45</span>
                              </div>
                              </div>
                              </div>
          </div>
    
    )

    }
    </>
  );
};

export default ProductItem;
