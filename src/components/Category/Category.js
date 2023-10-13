import React from 'react';
import Styles from './Category.module.scss';
import Card from '../card/Card';
import { Link } from 'react-router-dom';




const Category = () => {

    var category = [
        {
            name: "Laptop",
            image: "https://www.freepnglogos.com/uploads/laptop-png/laptop-png-who-are-adventoris-4.png",
            link_url: "laptop",
            height:"200px" 
        },
        {
            name: "Headphones",
            image: "data:image/jpeg;base64,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",
            link_url: "headphones",
            height:"200px" 
        },
        {
            name: "Mobiles",
            image: "https://img.freepik.com/premium-vector/mobile-smartphone-phone-mockup-isolated-white-background-with-blank-screen_88272-4578.jpg",
            link_url: "phone",
            height:"200px" 
        },
        {
            name: "Gaming accessories",
            image: "https://5.imimg.com/data5/EW/HD/MY-63101708/zeb-350wg-gaming-accessories.png",
            link_url: "gamingaccessories",
            height:"200px" 
        },
        
    ]


  

    return (

        <>
        <div className={Styles.title}>
        <h2>Category</h2>
        </div>
    <div className={Styles.category}>
       
          
        {
            category.map((item)=> (
                <div className={Styles.card}>
                    <Link to={`/shop/${item.link_url}`}>
                    <Card className={Styles.card_box}>
                        <img src={item.image} style={{height: item.height}}/>
                        <p>{item.name}</p>
                    </Card>
                    </Link>
                </div>
            )
                
            )
        }
</div>
</>
  )
}

export default Category