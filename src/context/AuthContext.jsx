import { createContext, useContext, useState, useEffect } from 'react'
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
            if (currentUser) {
                setUser(currentUser)

                try {
                    const userRef = doc(db, 'users', currentUser.uid)
                    const userSnap = await getDoc(userRef)
                    if (userSnap.exists()) {
                        const data = userSnap.data()
                        console.log('User role:', data.role)
                        setRole(data.role || 'student') // fallback in case role missing
                    } else {
                        setRole('student') // default fallback
                    }
                } catch (err) {
                    console.error('Error loading user role:', err)
                    setRole('student')
                }
            } else {
                setUser(null)
                setRole(null)
            }
            setLoading(false)

            console.log('Logged in UID:', currentUser.uid)
        })

        return () => unsubscribe()
    }, [])

    const logout = () => signOut(auth)

    return <AuthContext.Provider value={{ user, role, logout }}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
