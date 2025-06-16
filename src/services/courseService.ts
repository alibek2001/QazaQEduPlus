import api from './api';

interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
}

interface CourseData {
  title: string;
  description: string;
  image?: string;
  category: string;
  level: string;
  duration: string;
}

export const courseService = {
  // Получение всех курсов с возможностью фильтрации
  getCourses: async (filters: CourseFilters = {}) => {
    const { category, level, search } = filters;
    let url = '/courses';
    
    // Формируем строку запроса для фильтров
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (level) queryParams.append('level', level);
    if (search) queryParams.append('search', search);
    
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },

  // Получение курса по ID
  getCourseById: async (id: string | number) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Создание нового курса
  createCourse: async (courseData: CourseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  // Обновление курса
  updateCourse: async (id: string | number, courseData: Partial<CourseData>) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  // Удаление курса
  deleteCourse: async (id: string | number) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Запись на курс
  enrollCourse: async (id: string | number) => {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  }
};

export default courseService;
