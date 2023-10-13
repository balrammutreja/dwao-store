import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";







const Checkout = () => {


  const cartItems = useSelector(selectCartItems);



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);



  return (
    <>


<CheckoutForm />
    </>
  );
};

export default Checkout;
