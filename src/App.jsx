// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import PrivateRoute from './routes/PrivateRoute'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import UploadCourse from './pages/UploadCourse'

const App = () => {
    return (
        <Router>
            <div className='min-h-screen bg-gray-50'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/dashboard'
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/courses' element={<Courses />} />
                    <Route path='/courses/:id' element={<CourseDetail />} />
                    <Route
                        path='/upload'
                        element={
                            <PrivateRoute>
                                <UploadCourse />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/upload'
                        element={
                            <PrivateRoute>
                                <UploadCourse />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
