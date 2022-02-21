import React, { useContext, useState, useEffect } from 'react'
import config from '../firebase'
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
const AuthContext = React.createContext() 
export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        initializeApp(config)
        const auth = getAuth()
        const unsubscriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return unsubscriber
    }, [])

    // TODO: Handle this better
    const signup = async (email, password) => {
        const auth = getAuth()
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            return true
        } catch (error) {
            return false
        }
    }

    const signin = async (email, password) => {
        const auth = getAuth()
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            return true
        } catch (error) {
            return false
        }
    }

    const signout = async () => {
        const auth = getAuth()
        try {
            const result = await signOut()
            return true
        } catch (error) {
            return false
        }
    }

    const value = {
        currentUser,
        signup,
        signin,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider