// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBG6vf3q_slzHJFIojopJCkTG8NW8rPpko",
  authDomain: "todo-app-61800.firebaseapp.com",
  projectId: "todo-app-61800",
  storageBucket: "todo-app-61800.firebasestorage.app",
  messagingSenderId: "419757363302",
  appId: "1:419757363302:web:90faff73b3e4390a2e9da7",
  measurementId: "G-K08F9MQ6F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export default db;
