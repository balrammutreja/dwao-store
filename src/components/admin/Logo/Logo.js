import React, { useState } from 'react'
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import styles from './Logo.module.scss';
import Card from "../../card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { selectLogos } from '../../../redux/slice/logo.Slice';
import { useSelector } from 'react-redux';


const Logo = () => {

    const initialState = {
        name: "",
        logo: ""
      };
      
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const logos = useSelector(selectLogos);
    const logoEdit = logos.find((item)=>item.id === id) ; 
    
    
    const [logo,setLogo] = useState(()=>{
      const newState = detectForm(id, {...initialState},logoEdit
        )
        return newState;
    });
    
    
    const [uploadProgress, setUploadProgress] = useState(0);  
    const [status , setStatus] = useState("");  

    
      
    
      // console.log(logoEdit.id);


    function detectForm(id, f1, f2) {
        if (id === "Add") {
          return f1;
        }
        return f2;
      }

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogo({...logo, [name]: value});
        ;
      };

      const handleImageChange = (e)=>{
        const file = e.target.files[0];
   
        const storageRef = ref(storage, `eshop/logo/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
       
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              toast.error(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setLogo({ ...logo, logo: downloadURL });
                
                toast.success("Logo uploaded successfully.");
              });
            }
          );


      }

     const  addLogo = async (e)=>{
        e.preventDefault();
  
        setIsLoading(true);

        try {
            
            const docRef = await addDoc(collection(db, "Logos"), {
                name: logo.name,
                logo: logo.logo,
                status: 'inactive',
                createdAt: Timestamp.now().toDate(),
              });
              // console.log("Document written with ID: ", docRef.id);

                setIsLoading(false);
                setUploadProgress(0);
                setLogo({ ...initialState });

                toast.success("Logo uploaded successfully.");
                navigate("/admin/all-logos");
        } catch (error) {
            console.log(error);
            toast.success(error.message);
        }


     }    

     const getStatus =(e)=>{
      // console.log(e.target.value)
      setStatus(e.target.value);
     }



     const  editLogo = async(e)=>{
      e.preventDefault();
      //   navigatesetIsLoading(true);
        try {
          
            await setDoc(doc(db, "Logos", id), {
              name: logo.name,
                logo: logo.logo,
                status: status,
                createdAt: Timestamp.now().toDate(),
            });
            
                setIsLoading(false);
                setUploadProgress(0);
                toast.success("Logo Edit successfully.");
                navigate("/admin/all-logos");

        } catch (error) {
          console.log(error);
          toast.success(error.message);
        }

     } 
    //  console.log(logo)
  return (
    <div className={styles.logo}>
        <h2>{detectForm(id, "Add New Logo", "Edit Logo")}</h2>
       <Card >
        <form onSubmit={detectForm(id, addLogo, editLogo)}>
        <label>Logo name:</label>
        <input type="text" placeholder="Logo name" required name="name" onChange={(e)=>handleInputChange(e)}
          value={logo.name}
        />
        <Card>
        {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}  
        <label>Logo:</label>
        <input type="file" accept="image/*" placeholder="Logo" name="logo" onChange={(e) => handleImageChange(e)}/>

       {logo.logo === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={logo.logo}
                  disabled
                />
        )}
      



            {detectForm(id, "", (
                <select name='status' onChange={getStatus}>
                  {
                        logo.status === "active" ? (<><option value="active" selected>active</option><option value="inactive">inactive</option></>) : (<><option value="active">active</option><option value="inactive" selected>inactive</option></>)
                      }
                </select>
            ))}      

        </Card>
        

        <button className={styles.btn}>{detectForm(id, "Upload Logo", "Edit Logo")}</button>
        </form>
        </Card>
       
    </div>
  )
}

export default Logo