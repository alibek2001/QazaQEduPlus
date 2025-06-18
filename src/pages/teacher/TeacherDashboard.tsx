import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Box,
  Divider,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  image?: string;
  duration: number;
  enrollmentCount: number;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/courses/teacher');
        setCourses(response.data.data || []);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Ошибка при загрузке курсов');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherCourses();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Панель преподавателя
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/teacher/courses/create"
        >
          Создать новый курс
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Профиль преподавателя
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Имя:</strong> {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-end">
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/teacher/profile"
            >
              Редактировать профиль
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Ваши курсы
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {courses.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            У вас пока нет созданных курсов. Создайте свой первый курс!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/teacher/courses/create"
            sx={{ mt: 2 }}
          >
            Создать курс
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {course.image && (
                  <Box 
                    sx={{ 
                      height: 140, 
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} 
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description.length > 100 
                      ? `${course.description.substring(0, 100)}...` 
                      : course.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2">
                      <strong>Категория:</strong> {course.category}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Уровень:</strong> {course.level}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Длительность:</strong> {course.duration} часов
                    </Typography>
                    <Typography variant="body2">
                      <strong>Студентов:</strong> {course.enrollmentCount || 0}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/teacher/courses/${course._id}/edit`}
                  >
                    Редактировать
                  </Button>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/teacher/courses/${course._id}/lectures`}
                  >
                    Лекции
                  </Button>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/teacher/courses/${course._id}/students`}
                  >
                    Студенты
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TeacherDashboard;
