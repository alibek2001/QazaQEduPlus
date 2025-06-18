import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

// Define user type
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isAdmin: boolean;
}

// Define register data type
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isTeacher: false,
  isStudent: false,
  isAdmin: false
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Set up axios defaults
  axios.defaults.baseURL = 'http://localhost:5001';
  axios.defaults.withCredentials = true;

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get current user data
        const res = await axios.get('/api/auth/me');
        
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (err) {
        // Clear localStorage if token is invalid
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/login', { email, password });
      
      if (res.data.success) {
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        // Set user data
        setUser(res.data.data);
      } else {
        setError(res.data.message || 'Ошибка входа');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/register', userData);
      
      if (res.data.success) {
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        // Set user data
        setUser(res.data.data);
      } else {
        setError(res.data.message || 'Ошибка регистрации');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user data
    setUser(null);
  };

  // Computed properties
  const isAuthenticated = !!user;
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        isTeacher,
        isStudent,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
