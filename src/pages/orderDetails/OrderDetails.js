import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";


const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  const userId = useSelector(selectUserID);
  const loggedin = useSelector(selectIsLoggedIn);

  useEffect(() => {
    setOrder(document);
    adobeDatalayerOrderDetails();
  }, [document]);


  
  const adobeDatalayerOrderDetails = ()=>{
    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
    "event":"Pageload",
    eventInfo:{
    eventName:"my profile page"
    },
    page: {
    linkName: "my profile page",
    channel: "my profile",
    // for page name pass name of the page from which user clicks
    linkPageName:"my profile",
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



  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <div className="row">
           
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> ${order.orderAmount}
            </p>
            <p>
              <b>Order Status</b> {order.orderStatus}
            </p>
            <br />
            
            <div className="col-xl-12">
              <div className="table-content table-responsive cart-table-content">
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                       
                          <div class="cart-shiping-update-wrapper">
                            <div class="cart-shiping-update">
                            <Link to={`/review-product/${id}`}> Review Product</Link>
                              </div>
                          </div>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            </div>
            </div>
        
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
