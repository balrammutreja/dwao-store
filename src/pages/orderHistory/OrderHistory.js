import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import styles from "./OrderHistory.module.scss";
import BreadcrumbWrap from "../../components/Breadcrumb/Breadcrumb";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUserID);
  const loggedin = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);


useEffect(()=>{
  adobeDatalayerMyprofile();
},[])

  
  const adobeDatalayerMyprofile = ()=>{
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
    <>
    <BreadcrumbWrap  pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "My orders", path: '/order-history' }
          ]} 
        />
    <section className={styles.orderhistory}>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className="row">
            <div className="col-xl-12">
              <div className="table-content table-responsive cart-table-content">
            {filteredOrders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"}
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            </div>
          </div>
          </div>
        </>
      </div>
    </section>
    </>
  );
};

export default OrderHistory;
