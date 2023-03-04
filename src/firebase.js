import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZsUqZ3X7sFfQJSee3Ozei76gDDN8opY8",
    authDomain: "ridentity-da3c9.firebaseapp.com",
    projectId: "ridentity-da3c9",
    storageBucket: "ridentity-da3c9.appspot.com",
    messagingSenderId: "352100812166",
    appId: "1:352100812166:web:bbd83fc9774d8de4ae5807",
    measurementId: "G-Y1HH6T710R"
  };

const app =initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export function signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}

export function signUpWithGmail(googleProvider){
    return signInWithPopup(auth, googleProvider);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  export function logout() {
    return signOut(auth);
  }
  
  // Custom Hook
  export function useAuth() {
    const [ currentUser, setCurrentUser ] = useState();
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
      return unsub;
    }, [])
  
    return currentUser;
  }

export { db };