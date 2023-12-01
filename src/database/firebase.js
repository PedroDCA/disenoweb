// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtpZNgz8zI4XspZqis__2sK-8uiOZB8Nk",
  authDomain: "disenoweb2-df27e.firebaseapp.com",
  projectId: "disenoweb2-df27e",
  storageBucket: "disenoweb2-df27e.appspot.com",
  messagingSenderId: "50732789007",
  appId: "1:50732789007:web:04510f1f2bd357a3bd227a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export const auth = getAuth(app);
export default database;