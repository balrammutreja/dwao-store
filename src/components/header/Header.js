import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectIsLoggedIn,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
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
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

import { db, storage } from "../../firebase/config";
import { collection, query, where, onSnapshot, orderBy, limit, deleteDoc, doc } from "firebase/firestore";
import Search from "../search/Search";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { BiSearch } from "react-icons/bi";









const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = ({ changetheme, myTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const [Mylogos, setLogos] = useState([]);
  const [searchData, setSearchData] = useState(false);
  const [search, setSearch] = useState('');
  const [pro, setPro] = useState([]);
  const products = useFetchCollection('products');

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);



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









  useEffect(() => {
    getProducts();
  }, []);

  const logo = (

    <Link to="/">
      {/* <h2>
          DWAO
        </h2>  */}
      {Mylogos.map(ele => (<img src={ele.logo}  />))}

    </Link>

  );

  const getProducts = () => {
    // setIsLoading(true);


    try {
      const logoRef = collection(db, "Logos");
      const q = query(logoRef, where("status", "==", "active"));
      onSnapshot(q, (querySnapshot) => {
        const allLogos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        // console.log(allLogos);
        setLogos(allLogos);
      });


    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }







  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);


  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixNavbar);

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
    document.querySelector('.offcanvas-mobile-menu').classList.add('active');
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };




  useEffect(() => {

  }, [search]);
  //serach
  const searchProduct = (e) => {

    setSearchData(true);
    setSearch(e.target.value)

    getSearchData(search);

  }

  const getSearchData = (searchText) => {
    // console.log(searchText)
    const pro = products.data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase()));
    setPro(pro);
  }
  // console.log(pro.length)

  const closeMobileMenu = () => {
    document.querySelector('.offcanvas-mobile-menu').classList.remove('active');
  };

  const displayDropdown = ()=>{
    if(document.querySelector('.account-dropdown').classList.contains('active')){
      document.querySelector('.account-dropdown').classList.remove('active');
    }else{
      document.querySelector('.account-dropdown').classList.add('active');
    }
    
  }

  const displaySearch =()=>{
    if(document.querySelector('.search-content').classList.contains('active')){
      document.querySelector('.search-content').classList.remove('active');
    }else{
      document.querySelector('.search-content').classList.add('active');
    }
  }


  
  const displayCart =()=>{
    if(document.querySelector('.shopping-cart-content').classList.contains('active')){
      document.querySelector('.shopping-cart-content').classList.remove('active');
    }else{
      document.querySelector('.shopping-cart-content').classList.add('active');
    }
  }

  const categories = [
    { id: 1, name: "laptop", lable:"Laptop",type : "electronics"  },
    { id: 2, name: "electronics",lable:"Electronics",type : "electronics" },
    { id: 3, name: "fashion", lable:"Fashion",type : "fashion" },
    { id: 4, name: "phone", lable:"Mobiles",type : "electronics" },
    { id: 5, name: "headphones",lable:"Headphones",type : "electronics" },
    { id: 6, name: "gamingaccessories" ,lable:"Gaming accessories",type : "" },
    { id: 7, name: "manshirts" , lable:"Man Shirts",type : "fashion"},
    { id: 8, name: "womanshirts", lable:"Woman Shirts",type : "fashion" },
    { id: 9, name: "manpants", lable:"Man Pants",type : "fashion" },
    { id: 10, name: "womanpants", lable:"Woman Pants",type : "fashion" },
    { id: 11, name: "kidsware", lable:"kidsWare",type : "fashion" },
    { id: 12, name: "hairandcare", lable:"Hair and Care",type : "healthcare" },
    { id: 13, name: "skincare",lable:"Skin Care",type : "healthcare" },
    { id: 14, name: "nutraceuticals",lable:"Nutraceuticals",type : "healthcare" },
    { id: 15, name: "personalcare",lable:"Personal Care",type : "healthcare" },
  ];


  var category = [
    { 
        id:1, 
        name: "Laptop",
        image: "https://www.freepnglogos.com/uploads/laptop-png/laptop-png-who-are-adventoris-4.png",
        link_url: "laptop",
        height:"200px" 
    },
    {
        id:2, 
        name: "Headphones",
        image: "data:image/jpeg;base64,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",
        link_url: "headphones",
        height:"200px" 
    },
    {
        id:3, 
        name: "Mobiles",
        image: "https://img.freepik.com/premium-vector/mobile-smartphone-phone-mockup-isolated-white-background-with-blank-screen_88272-4578.jpg",
        link_url: "phone",
        height:"200px" 
    },
    {
        id:4, 
        name: "Gaming accessories",
        image: "https://5.imimg.com/data5/EW/HD/MY-63101708/zeb-350wg-gaming-accessories.png",
        link_url: "gamingaccessories",
        height:"200px" 
    },
    
]




// const hideDropdown = ()=>{


//       document.querySelector('.account-dropdown').classList.remove('active');
//       document.querySelector('.search-content').classList.remove('active');
//       document.querySelector('.shopping-cart-content').classList.remove('active');
 

// }



  return (
    <>
    


      <header className="header-area clearfix" onClick={()=>{setSearchData(false);}} >
        {/* <div className="header-top-area header-padding-1 d-none">
          <div className="container-fluid">
            <div className="header-top-wap">

              <div className="header-offer">
                <p>Free delivery on order over <span>€200.00</span></p>
              </div>
            </div>
          </div>
        </div> */}
        <div className={!scrollPage ? `header-padding-1 sticky-bar header-res-padding clearfix` : 'header-padding-1 sticky-bar header-res-padding clearfix stick'}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-6 col-4">
                <div className="logo">
                  {logo}
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                <div className="main-menu "><nav>
                  <ul>
                    <li>
                      <a href="#">Category<i className="fa fa-angle-down"></i></a>
                      <ul className="mega-menu mega-menu-padding" style={{display:'flex'}}>
                      <li>
                          <ul>
                          <li className="mega-menu-title">
                            <a href="/">Fashion</a>
                          </li>
                            {
                              categories.filter(item=> item.type == "fashion" ).map(ele =>(
                                <li key={ele.id}><Link to={`/shop/${ele.name}`}>{ele.lable}</Link></li>
                              ))
                           }  
                             
                          </ul>
                      </li>

                      <li>
                          <ul>
                          <li className="mega-menu-title">
                            <a href="/">Electronics</a>
                          </li>
                            {
                              categories.filter(item=> item.type == "electronics" ).map(ele =>(
                                <li key={ele.id}><Link to={`/shop/${ele.name}`}>{ele.lable}</Link></li>
                              ))
                           }  
                             
                          </ul>
                      </li>
                      <li>
                          <ul>
                          <li className="mega-menu-title">
                            <a href="/">Healthcare</a>
                          </li>
                            {
                              categories.filter(item=> item.type == "healthcare" ).map(ele =>(
                                <li key={ele.id}><Link to={`/shop/${ele.name}`} >{ele.lable}</Link></li>
                              ))
                           }  
                             
                          </ul>
                      </li>
                  
                            
                           

                          </ul>

                      </li>
                      <li><NavLink to="/shop">Shop</NavLink></li>
                      <li><NavLink to="/contact">Contact Us</NavLink></li>
                  </ul>
                  </nav>
                </div>

              </div>


              <div className="col-xl-2 col-lg-2 col-md-6 col-8">
                <div className="header-right-wrap">
             
                
                <ShowOnLogout>
                  
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                  
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#home" style={{ color: "#3457c8" }}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>

                

                </ShowOnLogin>
                  <div className="same-style header-search d-none d-lg-block">

                  

                    <button className="search-active" onClick={displaySearch}><i className="pe-7s-search"></i>
                    </button>
                    <div className="search-content">
                      <form action="#">
                        <input type="text"onChange={searchProduct} placeholder="Search Product..." value={search} />
                        <div className={styles.serachdata} style={{ display: searchData ? 'inherit' : 'none' }}>
                        <ul style={{position:'absolute',backgroundColor:'#fff'}}>
                    {pro.length !== 0 ? pro.map((item,index) => (
                      <li style={{borderBottom:'1px solid #ccc'}} key={index}>
                          
                        <Link to={`/product-details/${item.id}`} style={{display:'flex', flexDirection:'row'}}>
                          <img src={item.imageURL} style={{width:'70px'}}/>
                          <p>{item.name}</p>
                        </Link>

                      </li>
                    )) : <li>
                      <a>
                        <p>No result found</p>
                      </a>
                    </li>
                    }


                  </ul>
                        </div>
                      </form>
                    </div>



                  </div>
                  

                  <ShowOnLogin>
                  <div className="same-style account-setting d-none d-lg-block">
                    <button className="account-setting-active" onClick={displayDropdown}>
                      <i className="pe-7s-user-female"></i>
                    </button>
                    <div className="account-dropdown">
                      <ul>
                        <li><ShowOnLogout><NavLink to="/login" className={activeLink}>Login</NavLink></ShowOnLogout></li>
                        <li><NavLink to="/order-history" className={activeLink}>My Orders</NavLink></li>
                        <li><AdminOnlyLink>
                  <NavLink to="/admin/home">
                    Admin Panel
                  </NavLink>
                </AdminOnlyLink></li>  
                        <li><NavLink to="/" onClick={logoutUser}>Logout</NavLink></li>
                        </ul>
                        </div>
                    </div>
                    </ShowOnLogin>

                  


        <div className="same-style cart-wrap d-none d-lg-block">
                    <button className="icon-cart" onClick={displayCart}><i className="pe-7s-shopbag"></i>
                      <span className="count-style">{cartTotalQuantity}</span></button>
                     
                <div className="shopping-cart-content">
                {cartItems.length === 0 ?(
                  <p className="text-center">No items added to cart</p>
                      ) : 
                      (<><ul>
                        {cartItems.map((item)=>{
                          const { id, name, price, imageURL, cartQuantity } = item;
                       return (
                              <li className="single-shopping-cart" key={id}>
                              <div className="shopping-cart-img">
                                <Link to="/cart">
                                  <img alt="" src={imageURL} className="img-fluid"/>
                                  </Link>
                                  </div>
                                  <div className="shopping-cart-title">
                                    <h4><Link to="/cart">{name}</Link></h4>
                                    <h6>Qty: {cartQuantity}</h6>
                                    <span>${price}</span>
                                    </div>
                                    <div className="shopping-cart-delete">
                                      <button onClick={() => decreaseCart(item)}><i className="fa fa-times-circle"></i></button>
                                    </div>
                              </li>
                        )
                        
                        })
                     
                        }
                      </ul>
                    
                    {/* <div class="shopping-cart-total">
                     <h4>Total : <span class="shop-total">${(price * cartQuantity).toFixed(2)}</span></h4>
                    </div> */}
                  
                     <div className="shopping-cart-btn btn-hover text-center">
                          <Link className="default-btn" to="/cart">view cart</Link>
                          {/* <Link class="default-btn" to="/checkout">checkout</Link> */}
                     </div>
                     </>)
                     }
              </div>   

                      
        </div>
                      
                 
                  
                


                    <div className="same-style mobile-off-canvas d-block d-lg-none">
                      <button className="mobile-aside-button" onClick={hideMenu}><i className="pe-7s-menu"></i>
                      </button>
                    </div>
                </div>

              </div>
            </div>
          </div>

          <div className="offcanvas-mobile-menu" id="offcanvas-mobile-menu">

            <button className="offcanvas-menu-close" id="mobile-menu-close-trigger" onClick={closeMobileMenu}>
              <i className="pe-7s-close"></i></button>
              <div className="offcanvas-wrapper">
                <div className="offcanvas-inner-content">
                  <div className="offcanvas-mobile-search-area">
                    <form action="#">
                      <input type="search" placeholder="Search ..." /><button type="submit"><i className="fa fa-search"></i></button>
                    </form>

              </div>



                <div className="mobile-menu-middle">
                  <div className="lang-curr-style"></div>
                  <ul style={{ fontSize: '33px', fontWeight: '500' }}>
              
                    <li><AdminOnlyLink><NavLink to="/admin/home">Admin Panel</NavLink>
                </AdminOnlyLink></li>
                    <li><NavLink to="/shop">Shop</NavLink></li>
                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                    <ShowOnLogout><NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink></ShowOnLogout>
                  </ul>
                </div>
              </div>
            </div>

          </div>


        </div>
      </header>



    </>
  );
};

export default Header;
