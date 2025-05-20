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
import TeacherDashboard from './pages/TeacherDashboard'
import EditCourse from './pages/EditCourse'

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
                    <Route
                        path='/teacher-dashboard'
                        element={
                            <PrivateRoute>
                                <TeacherDashboard />
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
                        path='/edit-course/:id'
                        element={
                            <PrivateRoute>
                                <EditCourse />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
