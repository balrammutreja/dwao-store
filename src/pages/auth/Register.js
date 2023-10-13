import { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/reg.jpg";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import BreadcrumbWrap from "../../components/Breadcrumb/Breadcrumb";
import { selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = useSelector(selectUserID);
  const loggedin = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        setIsLoading(false);
        toast.success("Registration Successful...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };


  const adobeDatalayerLogin = ()=>{



    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
    "event":"linkClicked",
    eventInfo:{
    eventName:"menuClicked"
    },
    page: {
    linkName: "Signup",
    channel: "signup",
    // for page name pass name of the page from which user clicks
    linkPageName:"Signup",
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
            {label: "Register", path: '/login' }
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
                            <form onSubmit={registerUser}>
                            <input
                type="text"
                placeholder="Email"
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
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
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

export default Register;
