import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import auth from '../config/firebase.config';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    const updateUserInfo = (name, photoURL)=>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL
        })
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> unsubscribe()
    }, [])

  const authInfo = {
    user,
    loading,
    logIn,
    register,
    logOut,
    updateUserInfo,
    logInWithGoogle
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
