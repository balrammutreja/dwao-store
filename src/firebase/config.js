import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FB_API_KEY,
  // authDomain: "eshop-ea8e7.firebaseapp.com",
  // projectId: "eshop-ea8e7",
  // storageBucket: "eshop-ea8e7.appspot.com",
  // messagingSenderId: "146569443233",
  // appId: "1:146569443233:web:46db000fc2c897f3b73de0",

  apiKey: "AIzaSyDg30VN0fY0sCvBhZxeuBivucJzAk4wNQ0",
  authDomain: "ecommerce-app-b3d43.firebaseapp.com",
  projectId: "ecommerce-app-b3d43",
  storageBucket: "ecommerce-app-b3d43.appspot.com",
  messagingSenderId: "739166878286",
  appId: "1:739166878286:web:f34901217818a553fe211f",
  measurementId: "G-R7NL3XCK5L"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
