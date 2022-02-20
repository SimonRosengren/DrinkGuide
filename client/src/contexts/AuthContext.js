import React, { useContext, useState, useEffect } from 'react'
import config from '../firebase'
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth'
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

    const signup = (email, password) => {
        const auth = getAuth()
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider