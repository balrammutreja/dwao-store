import React, { useEffect, useState } from 'react'
import styles from './CategoryProducts.module.scss'
import { FILTER_BY_CATEGORY, selectFilteredProducts } from '../../redux/slice/filterSlice'
import { selectProducts } from '../../redux/slice/productSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useFetchCollection from '../../customHooks/useFetchCollection'
import Card from '../../components/card/Card';
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../redux/slice/cartSlice'



const CategoryProduct = () => {

  
  const products = useFetchCollection('products');
    const {cat} = useParams();
    // const products = useSelector(selectProducts);
    const dispatch = useDispatch();


  const pro = products.data.filter((item)=> item.category === cat)
  

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  
  
  

  const addToCart = (data) => {
      dispatch(ADD_TO_CART(data));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    };
  
  useEffect(()=>{

  },[pro])
  

  return (
<>
    {
      <h2>Our {cat}</h2>
    }
    <div className={styles.filterCategory}>
      
{
          pro.length !== 0 ? pro.map((pro)=>(
            <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6">
            <div className="product-wrap mb-25">
              <div className="product-img">
              <Link to={`/product-details/${pro.id}`}>
                  <img className="default-img" src={pro.imageURL} alt=""/>
                  </Link>
                 
                  <div className="product-img-badges">
                    <span class="pink">-10%</span>
                    </div>
                    <div className="product-action">
                   
                        <div className="pro-same-action pro-cart" style={{width:'100%'}}>
                          <button onClick={()=>addToCart(pro)}>Add to cart</button>
                          </div>
                         
                            </div>
                            </div>
                            <div className="product-content text-center">
                              <h3> <Link to={`/product-details/${pro.id}`}>{pro.name}</Link></h3>
                               <div className="product-price"><span>${pro.price}</span> <span className="old">€12.45</span>
                                </div>
                                </div>
                                </div>
            </div>
         
            )) : <div className='row'><div className='container'><h2 >No product found</h2></div></div>
        }

    </div>
    </>
  )
}

export default CategoryProduct