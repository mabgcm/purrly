// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAhym48_zOm7-S78UzoXY-jM0WuZtqttI",
    authDomain: "purrly-22be7.firebaseapp.com",
    projectId: "purrly-22be7",
    storageBucket: "purrly-22be7.firebasestorage.app",
    messagingSenderId: "846870675458",
    appId: "1:846870675458:web:f4861bde2b894a97dba71b",
    measurementId: "G-FBXY3FVQ53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { db, auth, storage };
