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
import { STORE_ALL_THEME, selectAllThemes } from '../../../redux/slice/themeSlice';
import { useDispatch, useSelector } from 'react-redux';





const Theme = () => {

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

  const [theme, setTheme] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setAllthemes] = useState([]);
  const Navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const allThemes = useSelector(selectAllThemes);
  // console.log(allThemes);
useEffect(()=>{
  getTheme();
},[]);



function detectForm(id, f1, f2) {
  if (id === "") {
    return f1;
  }
  return f2;
}




const getTheme = () =>{
  try {
    const logoRef = collection(db, "Themes");
    const q = query(logoRef, orderBy("createdAt","desc"));
    onSnapshot(q, (querySnapshot) => {
     const allthemes = querySnapshot.docs.map((doc)=>({
      id: doc.id,
      ...doc.data()
     }));
    //  console.log(allthemes);
     setAllthemes(allthemes);
     dispatch(STORE_ALL_THEME(allthemes));
    });

    
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}







// save theme
const saveTheme = async(e)=>{
    e.preventDefault();
    setIsLoading(true);

  try{
  const docRef = await addDoc(collection(db, "Themes"), {

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
    status: 'inactive',
    createdAt: Timestamp.now().toDate(),
  });
    // console.log("Document written with ID: ", docRef.id);
    setIsLoading(false);
    toast.success("Theme created successfully.");

} catch (error) {
        console.log(error);
        toast.success(error.message);
}
}

//edit theme
const editTheme = async(e)=>{
  e.preventDefault();
  setIsLoading(true);

try{
const docRef = await addDoc(collection(db, "Themes"), {

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
  status: 'active',
  createdAt: Timestamp.now().toDate(),
});
  // console.log("Document written with ID: ", docRef.id);
  setIsLoading(false);
  toast.success("Theme created successfully.");

} catch (error) {
      console.log(error);
      toast.success(error.message);
}
}


const handleInputChange = (e)=>{
  const { name, value } = e.target;
  setTheme({...theme, [name]: value});
  // console.log(theme)
}

const confirmDelete = (id, logo) => {
  Notiflix.Confirm.show(
    "Delete Theme!!!",
    "You are about to delete this theme",
    "Delete",
    "Cancel",
    function okCb() {
      deleteProduct(id, logo);
    },
    function cancelCb() {
      console.log("Delete Canceled");
    },
    {
      width: "320px",
      borderRadius: "3px",
      titleColor: "orangered",
      okButtonBackground: "orangered",
      cssAnimationStyle: "zoom",
    }
  );
};


const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "Themes", id));
    toast.success("Theme deleted successfully.");
  } catch (error) {
    toast.error(error.message);
  }
};

return (
<div className={styles.theme}>

<div className={styles.right}>
    <h2>Theme</h2>
   <Card>
    <form onSubmit={detectForm(id, saveTheme, editTheme)}>

   
      <label>Theme name</label>
      <input type='text' placeholder='Theme name' onChange={handleInputChange} name="theme_name"/>

      <label>Theme color</label>
      <input type='text' placeholder='Theme color' onChange={handleInputChange} name="theme_color"/>

      <label>Slider color</label>
      <input type='text' placeholder='Slider color' onChange={handleInputChange} name="slider_color"/>

      <label>Header color</label>
      <input type='text' placeholder='Header Color' onChange={handleInputChange} name="headerColor"/>

      <label>Footer color</label>
      <input type='text' placeholder='Footer color' onChange={handleInputChange} name="footerColor"/>

      <label>Body color</label>
      <input type='text' placeholder='Body color' onChange={handleInputChange} name="bodyColor"/>

      <label>Forground color</label>
      <input type='text' placeholder='Forground color' onChange={handleInputChange} name="forground"/>

      <label>Hover color</label>
      <input type='text' placeholder='Hover color' onChange={handleInputChange} name="hover"/>

      {/* <label>Active color</label>
      <input type='text' placeholder='Active color' onChange={handleInputChange} name="active"/>

      <label>Danger button color</label>
      <input type='text' placeholder='Danger button color' onChange={handleInputChange} name="btnDanger"/>
      
      <label>primary button color</label>
      <input type='text' placeholder='Primary button color' onChange={handleInputChange} name="btnPrimary"/>

      <label>Sucess button color</label>
      <input type='text' placeholder='Sucess button color' onChange={handleInputChange} name="btnSucess"/> */}

      <label>brand color</label>
      <input type='text' placeholder='brand color' onChange={handleInputChange} name="brandColor"/>






    <Card>
    <button className={styles.btn}>Save</button>
    </Card>
    

    
    </form>
    </Card>
   </div> 

    <div className={styles.left}>
    <h2>All themes</h2>
      <Card>
      <table>
    <thead>
      <tr>
        <th>s/n</th>
        <th>Name</th>
        <th>status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {themes.map((item, index) => {
        const { id, theme_name, status } = item;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{theme_name}</td>
            <td>{status}</td>
            <td className={styles.icons}>
              <Link to={`/admin/theme/${id}`}>
                <FaEdit size={20} color="green" />
              </Link>
              &nbsp;
              <FaTrashAlt
                size={18}
                color="red"
                onClick={() => confirmDelete(id)}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
      </Card>
    </div>

</div>
)
}

export default Theme