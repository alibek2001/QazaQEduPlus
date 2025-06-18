import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'
import './App.css'

// Layouts
import MainLayout from './layouts/MainLayout'

// Context Providers
import { AuthProvider } from './contexts/AuthContext'

// Common Pages
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherProfile from './pages/teacher/TeacherProfile'
import CreateCourse from './pages/teacher/CreateCourse'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentProfile from './pages/student/StudentProfile'
import CourseDetail from './pages/student/CourseDetail'

// Components
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Common Routes */}
                        <Route
                            path='/'
                            element={
                                <MainLayout>
                                    <Home />
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/courses'
                            element={
                                <MainLayout>
                                    <Courses />
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <MainLayout>
                                    <Login />
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/register'
                            element={
                                <MainLayout>
                                    <Register />
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/about'
                            element={
                                <MainLayout>
                                    <About />
                                </MainLayout>
                            }
                        />

                        {/* Teacher Routes */}
                        <Route
                            path='/teacher/dashboard'
                            element={
                                <MainLayout>
                                    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                                        <TeacherDashboard />
                                    </ProtectedRoute>
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/teacher/profile'
                            element={
                                <MainLayout>
                                    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                                        <TeacherProfile />
                                    </ProtectedRoute>
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/teacher/courses/create'
                            element={
                                <MainLayout>
                                    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                                        <CreateCourse />
                                    </ProtectedRoute>
                                </MainLayout>
                            }
                        />

                        {/* Student Routes */}
                        <Route
                            path='/student/dashboard'
                            element={
                                <MainLayout>
                                    <ProtectedRoute allowedRoles={['student']}>
                                        <StudentDashboard />
                                    </ProtectedRoute>
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/student/profile'
                            element={
                                <MainLayout>
                                    <ProtectedRoute allowedRoles={['student']}>
                                        <StudentProfile />
                                    </ProtectedRoute>
                                </MainLayout>
                            }
                        />
                        <Route
                            path='/courses/:courseId'
                            element={
                                <MainLayout>
                                    <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                                        <CourseDetail />
                                    </ProtectedRoute>
                                </MainLayout>
                            }
                        />

                        {/* 404 Route */}
                        <Route
                            path='*'
                            element={
                                <MainLayout>
                                    <NotFound />
                                </MainLayout>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
