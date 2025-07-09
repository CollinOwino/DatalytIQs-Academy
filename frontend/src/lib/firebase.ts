// src/lib/firebase.ts or src/firebase/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJBSSfvL_OvEHtRN47aZ617qu0psPwq3U",
  authDomain: "datalytiqs-academy.firebaseapp.com",
  projectId: "datalytiqs-academy",
  storageBucket: "datalytiqs-academy.appspot.com",
  messagingSenderId: "750136278228",
  appId: "1:750136278228:web:c364fbcdebdf3e68610f41",
  measurementId: "G-BZ129N6FQW"
};

// Initialize Firebase once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
