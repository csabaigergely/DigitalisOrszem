// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4NTMprS8GNn91rs2KtdWKNptl0q9qTec",
    authDomain: "digitalisorszem.firebaseapp.com",
    projectId: "digitalisorszem",
    storageBucket: "digitalisorszem.firebasestorage.app",
    messagingSenderId: "97211891874",
    appId: "1:97211891874:web:ffa468a83b941f721657fb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
