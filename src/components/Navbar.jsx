// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, role, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <nav className='bg-white shadow-md p-4 flex justify-between items-center'>
            <Link to='/' className='font-bold text-xl text-blue-600'>
                QazaqEdu+
            </Link>

            <div className='space-x-4'>
                <Link to='/' className='text-gray-700 hover:text-blue-600'>
                    Home
                </Link>
                <Link to='/courses' className='text-gray-700 hover:text-blue-600'>
                    Courses
                </Link>

                {user ? (
                    <>
                        <Link to='/dashboard' className='text-gray-700 hover:text-blue-600'>
                            Dashboard
                        </Link>
                        <button onClick={handleLogout} className='text-red-500 hover:text-red-700'>
                            Logout
                        </button>
                        <span className='ml-2 text-sm text-gray-500'>{user.email}</span>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='text-gray-700 hover:text-blue-600'>
                            Login
                        </Link>
                    </>
                )}

                <div></div>
                {user && role === 'teacher' && (
                    <>
                        <Link to='/upload' className='text-gray-700 hover:text-blue-600'>
                            Upload
                        </Link>
                        <Link to='/teacher-dashboard' className='text-gray-700 hover:text-blue-600'>
                            My Courses
                        </Link>
                    </>
                )}
                <div></div>
                {user && <p className='text-xs text-gray-500'>Logged in as: {user.email}</p>}
                {user && <span className='text-xs text-blue-600'>Role: {role}</span>}
            </div>
        </nav>
    )
}

export default Navbar
