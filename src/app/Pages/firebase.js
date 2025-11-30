// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";           // ✅ Make sure this is here
import { getFirestore } from "firebase/firestore"; // if you use Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo6gGOPkQndSni7yDJXlj_Ve2t015tHhA",
  authDomain: "blog-4057d.firebaseapp.com",
  projectId: "blog-4057d",
  storageBucket: "blog-4057d.firebasestorage.app",
  messagingSenderId: "332759228926",
  appId: "1:332759228926:web:787680f7b2f46616b9e0af",
  measurementId: "G-4KCJE13NNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);