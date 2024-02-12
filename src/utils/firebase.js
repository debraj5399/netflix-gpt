// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYxtqprzBhRVPe3IvLlFzL1h4LKgJk5CY",
  authDomain: "netflix-gpt-19f72.firebaseapp.com",
  projectId: "netflix-gpt-19f72",
  storageBucket: "netflix-gpt-19f72.appspot.com",
  messagingSenderId: "520075717808",
  appId: "1:520075717808:web:7e04261233a907161b5f75",
  measurementId: "G-B253MN53W8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
