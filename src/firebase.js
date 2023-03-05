import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);
export const auth = getAuth(app);
 const googleProvider = new GoogleAuthProvider();

export function signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}

// export function signUpWithGmail(googleProvider){
//     return signInWithPopup(auth, googleProvider);
// }

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  export function logout() {
    return signOut(auth);
  }
  




export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location = '/dashboard'
  } catch (err) {
    console.error(err);
  }
};


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