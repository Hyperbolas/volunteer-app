// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//references chatgpt, https://www.youtube.com/watch?v=b43uPnSM2Ow


const firebaseConfig = {
  apiKey: "AIzaSyBOKLFo0Pd_9GwZ89Rc3oNiHYuiyxLINuc",
  authDomain: "software-design-project-d375e.firebaseapp.com",
  projectId: "software-design-project-d375e",
  storageBucket: "software-design-project-d375e.firebasestorage.app",
  messagingSenderId: "63445377803",
  appId: "1:63445377803:web:006872ad4f6adc02b5b80e",
  measurementId: "G-WHNLCNYWLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
