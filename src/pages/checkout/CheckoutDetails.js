import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.js";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import styles from "./CheckoutDetails.module.scss";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice.js";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice.js";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { toast } from "react-toastify";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {


  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddresss = useSelector(selectShippingAddress);

  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    // navigate("/checkout");

    saveOrder();

  };


  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className="checkout-area pt-95 pb-100">
    <div className="container">
        
    <div className="row">
     <div className="col-lg-7">
       <div className="billing-info-wrap">
                 
        
        <h3>Checkout Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
          <h3>Shipping Address</h3>
          <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">


              
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              </div>
              </div>

              
              <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              </div>
              </div>
              
              <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              </div>
              </div>


              <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              </div>
              </div>
            <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              {/* COUNTRY INPUT */}
              <label>Country</label>
              <CountryDropdown
                // className={styles.select}
                styles={{border:'1px solid #ccc',padding:'10px'}}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              </div></div>

            <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            </div>

            {/* BILLING ADDRESS */}
            
              <h3>Billing Address</h3>

              <div className="col-lg-6 col-md-6">
            <div className="billing-info mb-20">
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>


              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>


              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              {/* COUNTRY INPUT */}
              <label>Country</label>
              <CountryDropdown
              styles={{border:'1px solid #ccc',padding:'10px'}}
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              </div>
              </div>

              <div className="col-lg-6 col-md-6">
               <div className="billing-info mb-20">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              </div>
              </div>
              <div class="your-order-area">
                 <div class="place-order mt-25">
                  <button class="btn-hover">Place Order</button
                  ></div>
                  </div>
          
          </div>
          
        </form>
        </div>
    </div>
    <div className="col-lg-5">
       <div className="your-order-area">
    
              <CheckoutSummary />
         
        </div>
     </div>


        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
