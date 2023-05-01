// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // can be managed in env
  // apiKey: "AIzaSyDYB5CJ02KjpD4wbw-496wXa8QyEpmcnmY",
  // authDomain: "org-task.firebaseapp.com",
  // projectId: "org-task",
  // storageBucket: "org-task.appspot.com",
  // messagingSenderId: "884090935886",
  // appId: "1:884090935886:web:fd106bd2826bcd6156011f",
  // measurementId: "G-CDYMVSQN25",
  apiKey: "AIzaSyBE3EZuVLVjmhZmjpEXmvcxUV83ga3J_Ko",
  authDomain: "org-task-85283.firebaseapp.com",
  projectId: "org-task-85283",
  storageBucket: "org-task-85283.appspot.com",
  messagingSenderId: "905511432969",
  appId: "1:905511432969:web:682f19cc3803431778d9d8",
  measurementId: "G-063W77PPKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
