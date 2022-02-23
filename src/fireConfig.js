import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBx7vCWi38p6tRzD181_M4gkLng9XbQcFU",
  authDomain: "e-commerce-16c8c.firebaseapp.com",
  projectId: "e-commerce-16c8c",
  storageBucket: "e-commerce-16c8c.appspot.com",
  messagingSenderId: "662241464889",
  appId: "1:662241464889:web:c9ac7d1e6b4cb5b5c6b3e8",
  measurementId: "G-4GWGL6HRH0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
