import dotenv from 'dotenv';
// dotenv.config()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "estatedb-89bd0.firebaseapp.com",
  projectId: "estatedb-89bd0",
  storageBucket: "estatedb-89bd0.firebasestorage.app",
  messagingSenderId: "166673093188",
  appId: "1:166673093188:web:a85f56794f3f5996bc2211"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

