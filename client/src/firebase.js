// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-25dfa.firebaseapp.com",
  projectId: "mern-estate-25dfa",
  storageBucket: "mern-estate-25dfa.firebasestorage.app",
  messagingSenderId: "126351289478",
  appId: "1:126351289478:web:c267cf2542722803adf507",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
