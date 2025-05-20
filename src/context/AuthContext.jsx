import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if (userDoc.exists()) {
                    setRole(userDoc.data().role)
                } else {
                    setRole('student') // default
                }
            } else {
                setRole(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const logout = () => signOut(auth)

    return <AuthContext.Provider value={{ user, role, logout }}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
