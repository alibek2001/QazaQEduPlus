import api from './api';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Регистрация пользователя
  register: async (userData: RegisterData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Вход пользователя
  login: async (userData: LoginData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Получение данных текущего пользователя
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Выход пользователя
  logout: () => {
    localStorage.removeItem('token');
  },

  // Проверка, авторизован ли пользователь
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

export default authService;
