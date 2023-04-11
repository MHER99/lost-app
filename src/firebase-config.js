// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEjbGBrY5Kyu6FZcTYsSxhePUpa0J_Bpc",
  authDomain: "lost-app-fb850.firebaseapp.com",
  projectId: "lost-app-fb850",
  storageBucket: "lost-app-fb850.appspot.com",
  messagingSenderId: "427199002446",
  appId: "1:427199002446:web:894df74f9ecf5a4eb4d01f",
  measurementId: "G-96HLSW2Q7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)