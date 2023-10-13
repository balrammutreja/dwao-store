import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

const ProductGrid = ({products}) => {
    const dispatch = useDispatch();
    const {data} = products;
    const loggedin = useSelector(selectIsLoggedIn);
    const addToCart = (data) => {
        dispatch(ADD_TO_CART(data));
        dispatch(CALCULATE_TOTAL_QUANTITY());
      };
    
      const adobeDataLayer = (item,index)=>{
        window.adobeDataLayer = window.adobeDataLayer || [];
        window.adobeDataLayer.push({
        "event":"Product click",
        eventInfo:{
        eventName:"Product click"
        },
        page: {
        pageName: "home",
        },
        product:{
        productName:item.name,
        productCategory:item.category,
        productPosition:index,
        },
        user: {
        loginStatus:loggedin ? "loggedin" : "guest",
        }
        })
     
      }


  return (
    <>
    {
        data ? data.map((item, index)=>(
            <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6" key={index}>
            <div className="product-wrap mb-25">
              <div className="product-img" onClick={()=>adobeDataLayer(item,index)}>
              <Link to={`/product-details/${item.id}`}>
                  <img className="default-img" src={item.imageURL} alt=""/>
                  </Link>
                 
                  <div className="product-img-badges">
                    <span className="pink">-10%</span>
                    </div>
                    <div className="product-action">
                   
                        <div className="pro-same-action pro-cart" style={{width:'100%'}}>
                          <button onClick={()=>addToCart(item)}>Add to cart</button>
                          </div>
                         
                            </div>
                            </div>
                            <div className="product-content text-center">
                              <h3> <Link to={`/product-details/${item.id}`}>{item.name}</Link></h3>
                               <div className="product-price"><span>${item.price}</span> <span className="old">€12.45</span>
                                </div>
                                </div>
                                </div>
            </div>
        )) : ""
    }
 </>
  )
  
}

export default ProductGrid