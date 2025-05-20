// src/pages/Login.jsx
import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const loginWithEmail = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded'>
            <h2 className='text-2xl font-bold text-center mb-4'>Login to QazaqEdu+</h2>
            {error && <p className='text-red-500 mb-3'>{error}</p>}

            <form onSubmit={loginWithEmail} className='space-y-4'>
                <div>
                    <label className='block mb-1'>Email</label>
                    <input
                        type='email'
                        className='w-full border px-3 py-2 rounded'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className='block mb-1'>Password</label>
                    <input
                        type='password'
                        className='w-full border px-3 py-2 rounded'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
                >
                    Login
                </button>
            </form>

            <hr className='my-4' />

            <button
                onClick={loginWithGoogle}
                className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600'
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default Login
