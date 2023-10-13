import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.scss";
import { Link } from "react-router-dom";

import { Navigation, Pagination, Scrollbar, A11y,EffectFade } from 'swiper/modules';
import Swiper, { SwiperSlide } from "../swiper";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";




const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  const loggedin = useSelector(selectIsLoggedIn);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  //   const auto = () => {
  //     slideInterval = setInterval(nextSlide, intervalTime);
  //   };

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  const params = {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    modules: [EffectFade],
    loop: true,
    speed: 1000,
    navigation: true
  };
  

  const adobeData =(item,index)=>{

window.adobeDataLayer = window.adobeDataLayer || [];
window.adobeDataLayer.push({
"event":"banner click",
eventInfo:{
eventName:"banner click"
},
 page: {
pageName: "home",
},
ICID:{
  data:`${item.heading}`+"banner "+`${index}`+" shop now",
},
user: {
loginStatus: loggedin ? "loggedIn" : "guest",
}
});

  }


  return (


    <div className="slider-area">
    <div className="slider-active nav-style-1">
<Swiper
    options={params}
    >

      {
        sliderData.map((item,index) => (
          <SwiperSlide key={index}>
      <div className="single-slider slider-height-1 bg-purple">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content slider-animated-1">
              <h3 className="animated">{item.heading}</h3>
              <h1 className="animated">{item.desc}</h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to="/shop"
                  onClick={adobeData(item,index)}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              <img
                className="animated img-fluid"
                src={item.image}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
      </SwiperSlide>
        ))
      }
      
 

       </Swiper>
</div>
</div>

  );
};

export default Slider;
