import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Snackbar
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  image?: string;
  duration: number;
  price: number;
  createdAt: string;
  teacher: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  lectures: {
    _id: string;
    title: string;
    duration: number;
  }[];
  enrollmentCount: number;
  isEnrolled?: boolean;
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourse(response.data.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Ошибка при загрузке курса');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    try {
      setEnrolling(true);
      setEnrollError(null);
      
      const response = await axios.post(`/api/courses/${courseId}/enroll`);
      
      if (response.data.success) {
        setEnrollSuccess(true);
        setCourse(prev => prev ? { ...prev, isEnrolled: true } : null);
      } else {
        setEnrollError(response.data.message || 'Ошибка при записи на курс');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setEnrollError(error.response?.data?.message || 'Ошибка при записи на курс');
    } finally {
      setEnrolling(false);
    }
  };

  const handleCloseSnackbar = () => {
    setEnrollSuccess(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          {error || 'Курс не найден'}
        </Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/courses')}
        >
          Вернуться к списку курсов
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              <Chip 
                icon={<CategoryIcon />} 
                label={course.category} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                icon={<SchoolIcon />} 
                label={course.level} 
                color="secondary" 
                variant="outlined" 
              />
              <Chip 
                icon={<AccessTimeIcon />} 
                label={`${course.duration} часов`} 
                variant="outlined" 
              />
              <Chip 
                icon={<PersonIcon />} 
                label={`${course.enrollmentCount || 0} студентов`} 
                variant="outlined" 
              />
            </Box>

            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Преподаватель
            </Typography>
            <Typography variant="body1" paragraph>
              {course.teacher.firstName} {course.teacher.lastName}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Содержание курса
            </Typography>
            
            {course.lectures && course.lectures.length > 0 ? (
              <List>
                {course.lectures.map((lecture, index) => (
                  <ListItem key={lecture._id} divider={index < course.lectures.length - 1}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={lecture.title} 
                      secondary={`Длительность: ${lecture.duration} мин.`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Информация о лекциях будет добавлена в ближайшее время.
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3} sx={{ position: 'sticky', top: 20 }}>
            {course.image ? (
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
            ) : (
              <Box 
                sx={{ 
                  height: 200, 
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h5" color="white">
                  {course.title}
                </Typography>
              </Box>
            )}
            
            <CardContent>
              <Box mb={3}>
                <Typography variant="h5" gutterBottom>
                  {course.price > 0 ? `${course.price} тг` : 'Бесплатно'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.lectures?.length || 0} лекций • {course.duration} часов
                </Typography>
              </Box>
              
              {enrollError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {enrollError}
                </Alert>
              )}
              
              {course.isEnrolled ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={() => navigate(`/courses/${course._id}/learn`)}
                >
                  Продолжить обучение
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? <CircularProgress size={24} /> : 'Записаться на курс'}
                </Button>
              )}
              
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/courses')}
              >
                Назад к списку курсов
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Snackbar 
        open={enrollSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Вы успешно записались на курс!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseDetail;
