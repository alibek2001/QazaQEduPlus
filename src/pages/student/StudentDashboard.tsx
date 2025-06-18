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
  Alert,
  LinearProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Enrollment {
  _id: string;
  course: {
    _id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    image?: string;
    duration: number;
  };
  progress: number;
  enrollmentDate: string;
  lastAccessDate: string;
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/students/enrollments');
        setEnrollments(response.data.data || []);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Ошибка при загрузке курсов');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
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
          Панель студента
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/courses"
        >
          Найти новые курсы
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Профиль студента
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
              to="/student/profile"
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

      {enrollments.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            Вы еще не записались ни на один курс. Найдите интересные курсы и начните обучение!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/courses"
            sx={{ mt: 2 }}
          >
            Найти курсы
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {enrollments.map((enrollment) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={enrollment._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {enrollment.course.image && (
                  <Box 
                    sx={{ 
                      height: 140, 
                      backgroundImage: `url(${enrollment.course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} 
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {enrollment.course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {enrollment.course.description.length > 100 
                      ? `${enrollment.course.description.substring(0, 100)}...` 
                      : enrollment.course.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2">
                      <strong>Категория:</strong> {enrollment.course.category}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Уровень:</strong> {enrollment.course.level}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Длительность:</strong> {enrollment.course.duration} часов
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography variant="body2" mr={1}>
                        <strong>Прогресс:</strong>
                      </Typography>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={enrollment.progress} 
                          sx={{ height: 8, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" ml={1}>
                        {enrollment.progress}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/courses/${enrollment.course._id}`}
                  >
                    Подробнее
                  </Button>
                  <Button 
                    size="small" 
                    color="primary"
                    component={RouterLink} 
                    to={`/courses/${enrollment.course._id}/learn`}
                  >
                    Продолжить обучение
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

export default StudentDashboard;
