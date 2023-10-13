import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { collection, query, where, onSnapshot,orderBy,limit, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from '../../../firebase/config';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTrashAlt } from 'react-icons/fa';
import styles from './ViewLogos.module.scss'
import Notiflix from 'notiflix';
import { deleteObject, ref } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { STORE_LOGOS } from '../../../redux/slice/logo.Slice';



const ViewLogos = () => {

  const [logos, setLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    getProducts();
  },[]);


  const getProducts = ()=>{
    setIsLoading(true);


    try {
      const logoRef = collection(db, "Logos");
      const q = query(logoRef, orderBy("createdAt","desc"));
      onSnapshot(q, (querySnapshot) => {
       const allLogos = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
       }));
       console.log(allLogos);
       setLogos(allLogos);
       dispatch(STORE_LOGOS(allLogos));
      });

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  const confirmDelete = (id, logo) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
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

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "Logos", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Logo deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.table}>
      {logos === 0 ? 
        <p>No product found</p>:  
        <table>
    <thead>
      <tr>
        <th>s/n</th>
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {logos.map((item, index) => {
        const { id, name, logo, status } = item;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>
              <img
                src={logo}
                alt={name}
                style={{ width: "100px" }}
              />
            </td>
            <td>{name}</td>
            <td>{status}</td>
            <td className={styles.icons}>
              <Link to={`/admin/logo/${id}`}>
                <FaEdit size={20} color="green" />
              </Link>
              &nbsp;
              <FaTrashAlt
                size={18}
                color="red"
                onClick={() => confirmDelete(id, logo)}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
    }
    

  </div>
  )
}

export default ViewLogos