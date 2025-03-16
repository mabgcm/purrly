// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDKKS3jOrqEKRy3BbKhXrbNfE78GVWkjZA",
    authDomain: "dollstore-7ccb0.firebaseapp.com",
    projectId: "dollstore-7ccb0",
    storageBucket: "dollstore-7ccb0.appspot.com",
    messagingSenderId: "802932298729",
    appId: "1:802932298729:web:ab6cf66b9b65707a35f178",
    measurementId: "G-82L0Z4350J"
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
