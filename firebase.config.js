// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJBSSfvL_OvEHtRN47aZ617qu0psPwq3U",
  authDomain: "datalytiqs-academy.firebaseapp.com",
  projectId: "datalytiqs-academy",
  storageBucket: "datalytiqs-academy.firebasestorage.app",
  messagingSenderId: "750136278228",
  appId: "1:750136278228:web:c364fbcdebdf3e68610f41",
  measurementId: "G-BZ129N6FQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
