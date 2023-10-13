import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
import BreadcrumbWrap from "../../components/Breadcrumb/Breadcrumb";
import { selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice";

const Login = () => {

  const userId = useSelector(selectUserID);
  const loggedin = useSelector(selectIsLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful...");
        adobeDatalayerLogin();
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Goooglr
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


useEffect(()=>{

},[userId,loggedin]);





const adobeDatalayerLogin = ()=>{



  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
  "event":"linkClicked",
  eventInfo:{
  eventName:"menuClicked"
  },
  page: {
  linkName: "login",
  channel: "Login",
  // for page name pass name of the page from which user clicks
  linkPageName:"Login",
  // pass name of the page from which user clicks
   }, 
  user: {
  customerID : userId, 
   // only pass when available
  loginStatus : loggedin ? "LoggerdIn" : "guest" ,
  platform:   "Desktop",
  // userDetails: "<gender>|<age>",
  // // pass only when user has logged in
  // dob: "<date of birth>"
  // // pass only when user is logged in
  }
  
  });

}




  return (
    <>

<BreadcrumbWrap 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Login", path: '/register' }
          ]} 
        />

      <div className="login-register-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper">

          <div style={{display:'flex',gap:'10px'}}>
                <Link to='/login' style={{marginLeft:'auto',marginBottom:'50px'}}>
                <h4 style={{fontSize:'25px',fontWeight: '700',textTransform: 'capitalize',transition: 'all 0.3s ease 0s',color: '#a749ff'}}>Login</h4>
                </Link>
                <p style={{color:'#a749ff'}}>|</p>
                <Link to='/register' style={{marginRight:'auto',marginBottom:'50px'}}>
                <h4 style={{fontSize:'25px',fontWeight: '700',textTransform: 'capitalize',transition: 'all 0.3s ease 0s',color: '#a749ff'}}>Register</h4>
                </Link>
</div>
                <div className="login-form-container">
                  <div className="login-register-form">
                    <form onSubmit={loginUser}>
                      <input
                        type="email"
                        placeholder="Username"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                              <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="button-box">
                        <div className="login-toggle-btn">
                          <input type="checkbox" />
                          <label className="ml-10">Remember me</label>
                          <Link to="/reset">Reset Password</Link>
                        </div>
                        <button type="submit">
                          <span>Login</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default Login;
