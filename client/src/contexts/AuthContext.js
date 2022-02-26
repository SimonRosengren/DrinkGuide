import React, { useContext, useState, useEffect } from 'react'
import config from '../firebase'
import { initializeApp } from 'firebase/app'
import { useHistory } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
const AuthContext = React.createContext() 
export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory()

    useEffect(() => {
        initializeApp(config)
        const auth = getAuth()
        const unsubscriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
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
            const result = await signOut(auth)
            history.push('/')
        } catch (error) {
            // Do something
        }
    }

    const value = {
        currentUser,
        signup,
        signin,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider