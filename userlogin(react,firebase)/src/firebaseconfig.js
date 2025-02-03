
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBYKe2xOo1liu-OWie-eRqIwIH71V1v3uM",
  authDomain: "userlogin-44d26.firebaseapp.com",
  projectId: "userlogin-44d26",
  storageBucket: "userlogin-44d26.firebasestorage.app",
  messagingSenderId: "1048389054333",
  appId: "1:1048389054333:web:18eb50fd4dc30059eea614",
  measurementId: "G-QMKN6C50EG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);
export { database,auth};