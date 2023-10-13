import React, { useEffect, useState } from 'react'
import styles from './Theme.module.scss';
import Card from "../../card/Card";
import { collection, query, where, onSnapshot,orderBy,limit, deleteDoc, doc ,addDoc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AlphaPicker, CirclePicker }  from 'react-color';
import { deleteObject, ref } from 'firebase/storage';  
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_THEME, selectAllThemes, selectThemes } from '../../../redux/slice/themeSlice';


const EditTheme = () => {

    const initialState = {
        theme_name: "",
        theme_color: "",
        slider_color: "",
        headerColor: "",
        footerColor: "",
        bodyColor: "",
        forground: "",
        hover: "",
        // active: "",
        // btnDanger: "",
        // btnPrimary:"",
        // btnSucess: "",
        // brandColor: "",
    
      };

      
      const [isLoading, setIsLoading] = useState(false);
      const [themes, setAllthemes] = useState([]);
      
      const Navigate = useNavigate();
      const { id } = useParams();
      // console.log(id)  


      const selectedTheme = useSelector(selectAllThemes);
      const editSelectedTheme = selectedTheme.find((item)=>item.id === id) ; 
      // console.log(editSelectedTheme);

      const [theme, setTheme] = useState(()=>{
         const newState = detectForm(id, {...initialState},editSelectedTheme)
         return newState;
      });
     
      const [status, setStatus] = useState("");
      
      function detectForm(id, f1, f2) {
        if (id === "Add") {
          return f1;
        }
        return f2;
      }


      const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setTheme({...theme, [name]: value});
        // console.log(theme);
      }


      const editTheme = async(e)=>{
        e.preventDefault();
        setIsLoading(true);
      
      try{
        // console.log(id);
        await setDoc(doc(db, "Themes", id), {
        theme_name: theme.theme_name,
        theme_color: theme.theme_color,
        slider_color: theme.slider_color,
        headerColor: theme.headerColor,
        footerColor: theme.footerColor,
        bodyColor: theme.bodyColor,
        forground: theme.forground,
        hover: theme.hover,
        // active: theme.active,
        // btnDanger: theme.btnDanger,
        // btnPrimary: theme.btnPrimary,
        // btnSucess: theme.btnSucess,
        // brandColor: theme.brandColor,
        status: status ? status : theme.status,
        createdAt: theme.createdAt,
        updatedAt: Timestamp.now().toDate(),
      });
      
        setIsLoading(false);
        toast.success("Theme Edit successfully.");
    
            Navigate("/admin/theme");
        
      
    
    } catch (error) {
            console.log(error);
            toast.success(error.message);
      }
    }

    const getStatus = (e)=>{
        setStatus(e.target.value);
        
    }

  return (
    <div className={styles.theme}>

                <div className={styles.right}>
                    <h2>Edit Theme</h2>

                    {
                        theme ?  <Card>
                        <form onSubmit={editTheme}>
    
                    
                        <label>Theme name</label>
                        <input type='text' placeholder='Theme name' onChange={handleInputChange} name="theme_name"
                        value={theme.theme_name}
                        />
    
                    <select name='status' onChange={getStatus}>
                      {
                        theme.status === "active" ? (<><option value="active" selected>active</option><option value="inactive">inactive</option></>) : (<><option value="active">active</option><option value="inactive" selected>inactive</option></>)
                      }
                      
                      
                    </select>    
                      

                    <label>Theme color</label>
                    <input type='text' placeholder='Theme color' onChange={handleInputChange} name="theme_color" value={theme.theme_color}/>

                    <label>Slider color</label>
                    <input type='text' placeholder='Slider color' onChange={handleInputChange} name="slider_color" value={theme.slider_color}/>


                        <label>Header color</label>
                        <input type='text' placeholder='Header Color' onChange={handleInputChange} name="headerColor"
                        value={theme.headerColor}
                        />
    
                        <label>Footer color</label>
                        <input type='text' placeholder='Footer color' onChange={handleInputChange} name="footerColor"
                        value={theme.footerColor}
                        />
    
                        <label>Body color</label>
                        <input type='text' placeholder='Body color' onChange={handleInputChange} name="bodyColor"
                        value={theme.bodyColor}
                        />
    
                        <label>Forground color</label>
                        <input type='text' placeholder='Forground color' onChange={handleInputChange} name="forground"
                        value={theme.forground}
                        />
    
                        <label>Hover color</label>
                        <input type='text' placeholder='Hover color' onChange={handleInputChange} name="hover"
                        value={theme.hover}
                        />
    
                        {/* <label>Active color</label>
                        <input type='text' placeholder='Active color' onChange={handleInputChange} name="active"
                        value={theme.active}
                        />
    
                        <label>Danger button color</label>
                        <input type='text' placeholder='Danger button color' onChange={handleInputChange} name="btnDanger"
                        value={theme.btnDanger}
                        />
                        
                        <label>primary button color</label>
                        <input type='text' placeholder='Primary button color' onChange={handleInputChange} name="btnPrimary"
                        value={theme.btnPrimary}
                        />
    
                        <label>Sucess button color</label>
                        <input type='text' placeholder='Sucess button color' onChange={handleInputChange} name="btnSucess"
                        value={theme.btnSucess}
                        />
    
                        <label>brand color</label>
                        <input type='text' placeholder='brand color' onChange={handleInputChange} name="brandColor"
                        value={theme.brandColor}
                        /> */}
    
    
    
    
    
    
                        <Card>
                        <button className={styles.btn}>Edit</button>
                        </Card>
                        
    
                        
                        </form>
                        </Card> : ""
                    }
               
                </div> 

  

</div>
  )
}

export default EditTheme