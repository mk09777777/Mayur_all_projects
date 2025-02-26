import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGEbjckzedYD5RdIHyZ7UjiqZR92f3Dcg",
  authDomain: "cookbook-d20e9.firebaseapp.com",
  projectId: "cookbook-d20e9",
  storageBucket: "cookbook-d20e9.appspot.com",
  messagingSenderId: "319761774338",
  appId: "1:319761774338:android:a26cf413a97a4a64bd341b",
  databaseURL: "https://cookbook-d20e9.firebaseio.com",
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
