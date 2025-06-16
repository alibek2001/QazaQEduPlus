import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'
import './App.css'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
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
        </ThemeProvider>
    )
}

export default App
