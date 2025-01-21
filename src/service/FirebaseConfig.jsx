// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHptYyIvDMTSgLH28no5Ms7YCLSFSqMpU",
  authDomain: "travel-planner-40f65.firebaseapp.com",
  projectId: "travel-planner-40f65",
  storageBucket: "travel-planner-40f65.firebasestorage.app",
  messagingSenderId: "1040161547128",
  appId: "1:1040161547128:web:81943aa74f266fe7cede8d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
