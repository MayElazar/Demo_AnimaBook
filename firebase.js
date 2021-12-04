// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzsu8n4FMEMyR62wGmNxZdfVio-LozKig",
  authDomain: "fir-media-proj.firebaseapp.com",
  projectId: "fir-media-proj",
  storageBucket: "fir-media-proj.appspot.com",
  messagingSenderId: "714503180418",
  appId: "1:714503180418:web:5c60190fc7fa6d0a7fa49b",
  measurementId: "G-7PXTXG4N65",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { app, db, storage, signup };
//const analytics = getAnalytics(app);
