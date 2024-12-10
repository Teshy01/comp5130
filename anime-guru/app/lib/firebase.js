// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyQeXaAYlb0d8IbfIQ7Sg5L05DwiQPvQM",
  authDomain: "animeguru-7ebba.firebaseapp.com",
  projectId: "animeguru-7ebba",
  storageBucket: "animeguru-7ebba.firebasestorage.app",
  messagingSenderId: "1007275315557",
  appId: "1:1007275315557:web:3c2d45450a5d04168a918c",
  measurementId: "G-771S8H3SSC",
};

// Initialize Firebase only if no apps are initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
