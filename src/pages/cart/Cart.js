import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import BreadcrumbWrap from "../../components/Breadcrumb/Breadcrumb";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <>
    <BreadcrumbWrap  pages={[
      {label: "Home", path: process.env.PUBLIC_URL + "/" },
      {label: "Cart", path: '/cart' }
    ]} 
  />
    <div className="cart-main-area pt-90 pb-100">
      <div className={`container ${styles.table}`}>
        <Fragment>
        <h3 className="cart-page-title">Your cart items</h3>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">

                        <table>
                          <thead>
                            <tr>
                              <th>s/n</th>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((cart, index) => {
                              const { id, name, price, imageURL, cartQuantity } = cart;
                              return (
                                <tr key={id}>
                                  <td>{index + 1}</td>
                                  <td className="product-thumbnail">
                                  
                                    <img
                                      src={imageURL}
                                      alt={name}
                                      style={{ width: "100px" }}
                                      className="img-fluid"
                                    />
                                  </td>
                                  <td className="product-name">
                                  {name}
                                  </td>
                                  <td className="product-price-cart">
                                  <Fragment>
                                      
                                      <span className="amount">
                                        ${price}
                                      </span>
                                    </Fragment>
                                  </td>
                                  
                                  <td className="product-quantity">
                                    <div className="cart-plus-minus">
                                      <button 
                                        className="dec qtybutton"
                                        onClick={() => decreaseCart(cart)}
                                      >
                                        -
                                      </button>
                                      
                                      <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartQuantity}
                                      readOnly
                                    />
                                      
                                     
                                      <button
                                        className="inc qtybutton"
                                        onClick={() => increaseCart(cart)}
                                      >
                                        +
                                      </button>
                                      </div>
                                  </td>

                                  

                                  <td className="product-subtotal">${(price * cartQuantity).toFixed(2)}</td>
                                  
                                 
                                  <td className="product-remove">
                                  <button
                                    onClick={() => removeFromCart(cart)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>

                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                 </div>
                 </div>
                 </div>             

            {/* <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div> */}

                  <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={clearCart}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row">
                

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                        {`$${cartTotalAmount ?cartTotalAmount.toFixed(2) : ""}`}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                        {`$${cartTotalAmount ?cartTotalAmount.toFixed(2) : ""}`}
                        </span>
                      </h4>
                      <a onClick={checkout}>
                        Proceed to Checkout
                      </a>
                    </div>
                  </div>
                </div>

          </>
        )}
        </Fragment>
      </div>
    </div>
    </>
  );
};

export default Cart;
